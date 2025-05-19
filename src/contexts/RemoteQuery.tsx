import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { decodeRecursively } from '../utils/utils';

interface DittoContextType {
  checkPeerOnline: (peerId: string) => Promise<boolean>;
  getPresenceData: (peerId: string) => Promise<any[]>;
  executePerPeerQuery: (peerId: string | undefined, query: string) => Promise<any>;
}

interface PresenceData {
  _id: number[];
  c: number[];
  d: string;
  n: number;
  o: number;
  s: number;
  t: number;
  v: number;
}

const API_ENDPOINT = import.meta.env.DITTO_API_ENDPOINT;
const AUTH_TOKEN = import.meta.env.DITTO_API_TOKEN;

export interface QueryResult {
  error: Record<string, any>;
  result: Array<{
    peer: {
      peerKeyString: string;
      peerMetadata: Record<string, any>;
      identityServiceMetadata: Record<string, any>;
    };
    elapsedMilliseconds: number;
    items: any[];
    error: Record<string, any>;
    warnings: any[];
    totalWarningsCount: number;
  }>;
}

export interface RemoteExecuteOptions {
  peerId?: string;
  statement: string;
}

class DittoService {
  private async executeQuery(options: RemoteExecuteOptions): Promise<QueryResult> {
    const { peerId, statement } = options;
    const finalStatement = peerId 
      ? `SYNC CONTEXT (PEERS WHERE peerKeyString = '${peerId}') ${statement}`
      : `SYNC CONTEXT (PEERS WHERE TRUE) ${statement}`;

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ statement: finalStatement })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 400 && errorData) {
        throw new Error(errorData.message || errorData.error || 'Invalid query syntax');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async checkPeerOnline(peerId: string): Promise<boolean> {
    try {
      const result = await this.executePerPeerQuery(
        peerId,
        'SELECT * FROM system:dual'
      );
      
      return result && !result.error;
    } catch (e) {
      return false;
    }
  }

  async getPresenceData(peerId: string): Promise<any[]> {
    const result = await this.executePerPeerQuery(
      peerId,
      'SELECT * FROM __presence'
    );
    
    const decodedResult = decodeRecursively(result);

    const nToDMap = new Map<number, string>();
    for (const peer of decodedResult) {
      nToDMap.set(peer.n, peer.d);
    }

    for (const peer of decodedResult) {
      for (const n in peer.c) {
        peer.c[n].d = nToDMap.get(Number(n));
      }
    }

    console.log(decodedResult);
    return decodedResult;
  }

  async executePerPeerQuery(peerId: string | undefined, query: string): Promise<any> {
    const result = await this.executeQuery({
      peerId,
      statement: query
    });

    if (peerId && result.result) {
      const peerResult = result.result.find(r => r.peer.peerKeyString === peerId);
      if (peerResult) {
        return peerResult.items.length > 0 ? peerResult.items : peerResult;
      }
      throw new Error('No results found for the specified peer');
    }

    return result;
  }
} 

const DittoRemoteQueryContext = createContext<DittoContextType | undefined>(undefined);

interface RemoteQueryProviderProps {
  children: ReactNode;
}

export const RemoteQueryProvider: React.FC<RemoteQueryProviderProps> = ({ children }) => {
  const dittoService = new DittoService();

  const value = {
    checkPeerOnline: dittoService.checkPeerOnline.bind(dittoService),
    getPresenceData: dittoService.getPresenceData.bind(dittoService),
    executePerPeerQuery: dittoService.executePerPeerQuery.bind(dittoService),
  };

  return (
    <DittoRemoteQueryContext.Provider value={value}>
      {children}
    </DittoRemoteQueryContext.Provider>
  );
};

export const useDitto = () => {
  const context = useContext(DittoRemoteQueryContext);
  if (context === undefined) {
    throw new Error('useDitto must be used within a DittoProvider');
  }
  return context;
}; 