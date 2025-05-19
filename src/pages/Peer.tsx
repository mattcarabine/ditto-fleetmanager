import { useParams } from 'react-router-dom';
import { useStore } from '../store/store';
import { useMemo } from 'react';
import QueryWorkbench from '../components/DQLWorkbench';
import PresenceGraph from '../components/PresenceGraph';
import { usePeerOnline, usePresenceData } from '../contexts/RemoteQuery';

export default function Peer() {
  const { peerId } = useParams();
  const { peers } = useStore();
  const { data: isOnline, isLoading: isOnlineLoading } = usePeerOnline(peerId || '');
  const { data: presence = [], isLoading: isPresenceLoading } = usePresenceData(peerId || '');

  const peer = useMemo(
    () => peers.find(p => p._id === peerId),
    [peers, peerId]
  );

  if (!peer) {
    return <div>Peer not found</div>;
  }

  return (
    <div className="peer-page">
      <h2>Peer Details</h2>
      
      <div className="peer-info">
        <h3>Peer ID: {peer._id}</h3>
        <p>Last Seen: {new Date(peer.last_updated_at).toLocaleString()}</p>
        <p>Status: {peer.connections_by_transport.WebSocket}</p>
        <p>
          Online Status: 
          <span style={{ 
            color: isOnline ? '#22c55e' : '#ef4444',
            marginLeft: '8px',
            fontWeight: 'bold'
          }}>
            {isOnlineLoading ? 'Checking...' : (isOnline ? 'Online' : 'Offline')}
          </span>
        </p>
        
        {peer.metadata && (
          <div className="metadata">
            <h4>Metadata</h4>
            <pre>{JSON.stringify(peer.metadata, null, 2)}</pre>
          </div>
        )}
      </div>

      {isOnline ? (
        <>
         <div className="presence-graph-section">
            <h3>Presence Graph</h3>
            {isPresenceLoading ? (
              <div>Loading presence data...</div>
            ) : (
              <PresenceGraph presence={presence} />
            )}
          </div>
          <div className="query-workbench-section">
            <h3>Query Workbench</h3>
            <QueryWorkbench peerId={peer._id} />
          </div>
        </>
      ) : (
        <div className="offline-message" style={{ 
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fee2e2',
          borderRadius: '0.5rem',
          color: '#991b1b'
        }}>
          <p>This peer is currently offline. The Query Workbench and Presence Graph will be available when the peer comes back online.</p>
        </div>
      )}
    </div>
  );
} 