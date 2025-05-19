import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { useMemo } from 'react';
import { usePeerOnline, usePresenceData } from '../contexts/RemoteQuery';
import PresenceGraph from '../components/PresenceGraph';
import type { Peer } from '../types/peer';

export default function GroupPeers() {
  const { groupName, metadataValue } = useParams();
  const navigate = useNavigate();
  const { peers } = useStore();
  
  const filteredPeers = useMemo(
    () => {
      if (!groupName) return [];
      return peers.filter(peer => 
        peer.metadata && 
        groupName in peer.metadata &&
        peer.metadata[groupName as keyof typeof peer.metadata] === metadataValue
      );
    },
    [peers, groupName, metadataValue]
  );

  const chosenPeer = filteredPeers[0];
  const { data: presence = [] } = usePresenceData(chosenPeer?._id || '');
  
  const onlineStatuses: { peerId: string; isOnline: boolean }[] = [];

  const handlePeerClick = (peerId: string) => {
    navigate(`/peer/${peerId}`);
  };

  const getTotalDocuments = (peer: Peer) => {
    if (!peer.store?.user_collections) return 0;
    return Object.values(peer.store.user_collections).reduce((total: number, collection) => {
      return total + (collection.num_docs || 0);
    }, 0);
  };

  return (
    <div className="group-peers-page">
      <h2>{groupName}: {metadataValue}</h2>
      
      <div className="presence-graph-section">
        <h3>Presence Graph</h3>
        <PresenceGraph presence={presence} />
      </div>
          
      <div className="peers-table">
        <table>
          <thead>
            <tr>
              <th>Peer Name</th>
              <th>Last Seen</th>
              <th>Status</th>
              <th>Online Status</th>
              <th>Total Documents</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeers.map((peer) => {
              const onlineStatus = onlineStatuses.find(status => status.peerId === peer._id);
              return (
                <tr 
                  key={peer._id}
                  onClick={() => handlePeerClick(peer._id)}
                  style={{ cursor: 'pointer' }}
                  className="peer-row"
                >
                  <td>{peer.device_name || peer._id}</td>
                  <td>{new Date(peer.last_updated_at).toLocaleString()}</td>
                  <td>{peer.connections_by_transport.WebSocket}</td>
                  <td>
                    <span style={{ 
                      color: onlineStatus?.isOnline ? '#22c55e' : '#ef4444',
                      fontWeight: 'bold'
                    }}>
                      {onlineStatus?.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td>{getTotalDocuments(peer)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 