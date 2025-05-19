import { useStore } from '../store/store';

export default function ConfigureSettings() {
  const { 
    deviceStalenessTime, 
    setDeviceStalenessTime,
    remoteQueryRefreshInterval,
    setRemoteQueryRefreshInterval 
  } = useStore();

  const handleStalenessTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setDeviceStalenessTime(value);
    }
  };

  const handleRefreshIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setRemoteQueryRefreshInterval(value);
    }
  };

  return (
    <div className="settings-page">
      <h2>App Settings</h2>
      
      <div className="settings-section">
        <h3>Device Settings</h3>
        <div className="setting-item">
          <label htmlFor="staleness-time">
            Device Staleness Time (seconds)
            <span className="setting-description">
              How long a device can be offline before being considered stale
            </span>
          </label>
          <input
            id="staleness-time"
            type="number"
            min="0"
            value={deviceStalenessTime}
            onChange={handleStalenessTimeChange}
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>Query Settings</h3>
        <div className="setting-item">
          <label htmlFor="refresh-interval">
            Remote Query Refresh Interval (seconds)
            <span className="setting-description">
              How often to refresh remote queries (minimum 1 second)
            </span>
          </label>
          <input
            id="refresh-interval"
            type="number"
            min="1"
            value={remoteQueryRefreshInterval}
            onChange={handleRefreshIntervalChange}
          />
        </div>
      </div>
    </div>
  );
} 