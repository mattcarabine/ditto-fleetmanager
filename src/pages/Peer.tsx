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
      {/* Header */}
      <div style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#111',
        borderRadius: '1rem',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{peer.device_name}</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#aaa' }}>Peer ID: <span style={{ fontFamily: 'monospace', color: '#3b82f6' }}>{peer._id}</span></p>
          </div>
          <div style={{
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            background: isOnline ? '#22c55e' : '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            {isOnlineLoading ? 'Checking...' : (isOnline ? 'Online' : 'Offline')}
          </div>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #333'
        }}>
          <div>
            <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>OS</div>
            <div>{peer.ditto_sdk_platform}</div>
          </div>
          <div>
            <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>SDK Language</div>
            <div>{peer.ditto_sdk_language}</div>
          </div>
          <div>
            <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.25rem' }}>SDK Version</div>
            <div>{peer.ditto_sdk_version}</div>
          </div>
        </div>
      </div>

      {/* Device Metadata */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>Device metadata</h3>
        <p style={{ color: '#aaa' }}>Metadata assigned to device. <a href="https://docs.ditto.live" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Read the docs ↗</a></p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>location</strong>
            <div style={{ color: '#aaa' }}>{peer.metadata?.location || '—'}</div>
          </div>
          <div>
            <strong>role</strong>
            <div style={{ color: '#aaa' }}>{peer.metadata?.role || '—'}</div>
          </div>
        </div>
      </div>

      {/* Subscriptions */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>Subscriptions</h3>
        <p style={{ color: '#aaa' }}>Queries device subscribed to</p>
        <div style={{ marginTop: '1rem', fontFamily: 'monospace', background: '#181818', borderRadius: '0.5rem', padding: '1rem' }}>
          {peer.local_subscriptions.queries.length === 0 ? (
            <div>No subscriptions</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {peer.local_subscriptions.queries.map((q, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{q.query}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Disk Usage */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>Disk usage</h3>
        <p style={{ color: '#aaa' }}>Storage available and used on device</p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>{((peer.device_disk_usage.device_total - peer.device_disk_usage.device_available) / 1e9).toFixed(2)} GB</strong> of <strong>{(peer.device_disk_usage.device_total / 1e9).toFixed(2)} GB</strong> used
            <span style={{ marginLeft: '1rem', color: '#aaa' }}>{(peer.device_disk_usage.device_available / 1e9).toFixed(2)} GB available</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>Ditto data: {(peer.device_disk_usage.ditto_total / 1e6).toFixed(0)} MB</li>
            <li style={{ marginLeft: '1rem' }}>Store: {(peer.device_disk_usage.ditto_store / 1e6).toFixed(0)} MB</li>
            <li style={{ marginLeft: '1rem' }}>Attachments: {(peer.device_disk_usage.ditto_attachments / 1e6).toFixed(0)} MB</li>
            <li style={{ marginLeft: '1rem' }}>Replication: {(peer.device_disk_usage.ditto_replication / 1e6).toFixed(0)} MB</li>
            <li style={{ marginLeft: '1rem' }}>Other: {((peer.device_disk_usage.ditto_total - peer.device_disk_usage.ditto_store - peer.device_disk_usage.ditto_attachments - peer.device_disk_usage.ditto_replication) / 1e6).toFixed(0)} MB</li>
            <li>Non-Ditto data: {((peer.device_disk_usage.device_total - peer.device_disk_usage.ditto_total) / 1e9).toFixed(0)} GB</li>
          </ul>
        </div>
      </div>

      {/* Log Configuration */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>Log configuration</h3>
        <p style={{ color: '#aaa' }}>Log level configured for device</p>
        <div style={{ marginTop: '1rem' }}>
          <div>Status: <span style={{ color: peer.logs_config.enabled ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>{peer.logs_config.enabled ? 'Enabled' : 'Disabled'}</span></div>
          <div>Minimum level: <span style={{ background: '#3b82f6', color: '#fff', borderRadius: '0.5rem', padding: '0.2rem 0.7rem', fontSize: '0.9em', marginLeft: '0.5rem' }}>{peer.logs_config.minimum_level}</span></div>
        </div>
      </div>

      {/* SDK Information */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>SDK information</h3>
        <p style={{ color: '#aaa' }}>Details about Ditto SDK on device</p>
        <div style={{ marginTop: '1rem' }}>
          <div>Language: {peer.ditto_sdk_language}</div>
          <div>Version: {peer.ditto_sdk_version}</div>
          <div>Address peer key: <span style={{ fontFamily: 'monospace', fontSize: '0.95em' }}>{peer._id}</span></div>
        </div>
      </div>

      {/* Collections */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
        <h3>Collections</h3>
        <p style={{ color: '#aaa' }}>Collections in the local store</p>
        <div style={{ marginTop: '1rem' }}>
          <table style={{ width: '100%', background: '#181818', borderRadius: '0.5rem', color: '#fff' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Documents</th>
              </tr>
            </thead>
            <tbody>
              {peer.store?.user_collections && Object.entries(peer.store.user_collections).length > 0 ? (
                Object.entries(peer.store.user_collections).map(([name, col]) => (
                  <tr key={name}>
                    <td style={{ padding: '0.5rem' }}>{name}</td>
                    <td style={{ padding: '0.5rem' }}>{col.num_docs}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} style={{ padding: '0.5rem' }}>No collections</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Peer Status Card */}
      <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem', color: '#fff' }}>
        <h3 style={{ marginTop: 0 }}>Peer Status</h3>
        <div style={{ marginTop: '1rem' }}>
          <div><strong>Peer ID:</strong> <span style={{ fontFamily: 'monospace', color: '#3b82f6' }}>{peer._id}</span></div>
          <div style={{ marginTop: '0.5rem' }}><strong>Last Seen:</strong> <span style={{ color: '#aaa' }}>{new Date(peer.last_updated_at).toLocaleString()}</span></div>
          <div style={{ marginTop: '0.5rem' }}><strong>Status:</strong> <span style={{ color: '#fff' }}>{peer.connections_by_transport.WebSocket}</span></div>
          <div style={{ marginTop: '0.5rem' }}><strong>Online Status:</strong> 
            <span style={{ 
              color: isOnline ? '#22c55e' : '#ef4444',
              marginLeft: '8px',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}>
              {isOnlineLoading ? 'Checking...' : (isOnline ? 'Online' : 'Offline')}
            </span>
          </div>
        </div>
      </div>

      {/* Presence Graph and Query Workbench */}
      {isOnline ? (
        <>
          <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
            <h3>Presence Graph</h3>
            <p style={{ color: '#aaa' }}>Visual representation of peer connections</p>
            {isPresenceLoading ? (
              <div>Loading presence data...</div>
            ) : (
              <div style={{ marginTop: '1rem' }}>
                <PresenceGraph presence={presence} />
              </div>
            )}
          </div>
          <div className="section-card" style={{ margin: '2rem 0', padding: '1.5rem', background: '#111', borderRadius: '1rem' }}>
            <h3>Query Workbench</h3>
            <p style={{ color: '#aaa' }}>Execute DQL queries against this peer</p>
            <div style={{ marginTop: '1rem' }}>
              <QueryWorkbench peerId={peer._id} />
            </div>
          </div>
        </>
      ) : (
        <div className="offline-message" style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#111',
          border: '1px solid #333',
          borderRadius: '1rem',
          color: '#ef4444'
        }}>
          <p style={{ margin: 0 }}>This peer is currently offline. The Query Workbench and Presence Graph will be available when the peer comes back online.</p>
        </div>
      )}
    </div>
  );
} 