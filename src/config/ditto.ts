import { Ditto, TransportConfig, init } from '@dittolive/ditto';
import type { IdentityOnlinePlayground } from '@dittolive/ditto';

// Initialize Ditto instance at the top level to prevent garbage collection
let ditto: Ditto | null = null;

export const initializeDitto = async () => {
  if (ditto) return ditto;

  await init();

  const identity: IdentityOnlinePlayground = {
    type: 'onlinePlayground',
    appID: import.meta.env.DITTO_APP_ID,
    token: import.meta.env.DITTO_PLAYGROUND_TOKEN,
    customAuthURL: import.meta.env.DITTO_AUTH_URL,
    enableDittoCloudSync: false,
  };

  ditto = new Ditto(identity);
  const config = new TransportConfig();
  config.connect.websocketURLs.push(import.meta.env.DITTO_WEBSOCKET_URL);
  ditto.setTransportConfig(config);
  await ditto.store.execute('ALTER SYSTEM SET DQL_ENABLE_PREVIEW_MODE = true');
  await ditto.store.execute('ALTER SYSTEM SET DQL_STRICT_MODE = false');
  await ditto.store.execute('ALTER SYSTEM SET DQL_USE_LEGACY_PROJECTION = true');
  ditto.smallPeerInfo.isEnabled = false;
  

  try {
    ditto.startSync();
    console.log('Ditto started successfully');
  } catch (error) {
    console.error('Failed to start Ditto:', error);
    throw error;
  }

  return ditto;
};

export const getDitto = () => {
  if (!ditto) {
    throw new Error('Ditto not initialized. Call initializeDitto first.');
  }
  return ditto;
}; 