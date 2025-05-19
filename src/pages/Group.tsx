import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { useMemo } from 'react';

export default function Group() {
  const { groupName } = useParams();
  const { peers, groups } = useStore();
  
  const group = useMemo(() => groups.find(g => g._id === groupName), [groups, groupName]);
  
  const values = useMemo(
    () => {
      if (!group) return [];
      
      const metadataCount = new Map();
      peers.forEach(peer => {
        if (peer.metadata && peer.metadata[group._id]) {
          const metadataValue = peer.metadata[group._id];
          if (metadataCount.has(metadataValue)) {
            metadataCount.set(metadataValue, metadataCount.get(metadataValue) + 1);
          } else {
            metadataCount.set(metadataValue, 1);
          }
        }
      });
      return Array.from(metadataCount.entries());
    },
    [peers, group]
  );

  if (!groupName) {
    return <div>Group name is required</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div className="group-page">
      <h2>{group.name}</h2>
      
      <div className="group-table">
        <table>
          <thead>
            <tr>
              <th>{group.name}</th>
              <th>Number of Devices</th>
            </tr>
          </thead>
          <tbody>
            {values.map(([metadataValue, count]) => (
              <tr key={metadataValue}>
                <td>
                  <Link to={`/group/${groupName}/${metadataValue}`}>
                    {metadataValue}
                  </Link>
                </td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 