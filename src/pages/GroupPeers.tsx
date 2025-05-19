import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { useMemo, useState, useEffect } from 'react';
import { useDitto } from '../contexts/RemoteQuery';
import PresenceGraph from '../components/PresenceGraph';

export default function GroupPeers() {
  const { groupName, metadataValue } = useParams();
  const navigate = useNavigate();
  const { peers } = useStore();
  const { checkPeerOnline, getPresenceData } = useDitto();
  const [onlineStatus, setOnlineStatus] = useState<Record<string, boolean>>({});
  const [presence, setPresence] = useState<any[]>([]);
  
  const filteredPeers = useMemo(
    () => {
      if (!groupName) return [];
      return peers.filter(peer => 
        peer.metadata && 
        peer.metadata[groupName] === metadataValue
      );
    },
    [peers, groupName, metadataValue]
  );

  useEffect(() => {
    const chosenPeer = filteredPeers[0];
    const fetchPresence = async () => {
      if (chosenPeer) {
        const data = await getPresenceData(chosenPeer._id);
        setPresence(data);
      }
    };
    fetchPresence();
  }, [filteredPeers]);


  useEffect(() => {
    const checkPeersOnline = async () => {
      const status: Record<string, boolean> = {};
      for (const peer of filteredPeers) {
        status[peer._id] = await checkPeerOnline(peer._id);
      }
      setOnlineStatus(status);
    };

    checkPeersOnline();
    // Check online status every 30 seconds
    const interval = setInterval(checkPeersOnline, 30000);
    return () => clearInterval(interval);
  }, [filteredPeers, checkPeerOnline]);

  const handlePeerClick = (peerId: string) => {
    navigate(`/peer/${peerId}`);
  };

  const getTotalDocuments = (peer: any) => {
    if (!peer.store?.user_collections) return 0;
    return Object.values(peer.store.user_collections).reduce((total: number, collection: any) => {
      return total + (collection.num_docs || 0);
    }, 0);
  };

  return (
    <div className="group-peers-page">
      <h2>Peers in Group: {groupName}</h2>
      <h3>Metadata Value: {metadataValue}</h3>
      
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
            {filteredPeers.map((peer) => (
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
                    color: onlineStatus[peer._id] ? '#22c55e' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {onlineStatus[peer._id] ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td>{getTotalDocuments(peer)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 