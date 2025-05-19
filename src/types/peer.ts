interface ConnectionHistoryEvent {
  event: string;
  timestamp: string;
}

interface ConnectionsByTransport {
  AccessPoint: number;
  Bluetooth: number;
  P2PWiFi: number;
  WebSocket: number;
}

interface DeviceDiskUsage {
  device_available: number;
  device_total: number;
  ditto_attachments: number;
  ditto_auth: number;
  ditto_replication: number;
  ditto_store: number;
  ditto_total: number;
}

interface LocalSubscription {
  query: string;
}

interface LocalSubscriptions {
  queries: LocalSubscription[];
  truncated: boolean;
}

interface LogsConfig {
  enabled: boolean;
  minimum_level: string;
}

interface Reaper {
  last_reap_time: string;
  num_tombstones_reaped: number | null;
}

interface UserCollection {
  num_docs: number;
}

interface Store {
  truncated: boolean;
  user_collections: {
    [key: string]: UserCollection;
  };
}

interface CloudConfig {
  enabled: boolean;
  sync_url: string;
}

interface ConnectConfig {
  retry_interval: number;
  tcp_servers: string[];
  websocket_urls: string[];
}

interface GlobalConfig {
  routing_hint: number;
  sync_group: number;
}

interface HttpConfig {
  enabled: boolean;
  interface_ip: string;
  port: number;
  static_content_path: string | null;
  tls_certificate_path: string | null;
  tls_key_path: string | null;
  websocket_sync: boolean;
}

interface TcpConfig {
  enabled: boolean;
  interface_ip: string;
  port: number;
}

interface PeerToPeerConfig {
  awdl: {
    enabled: boolean;
  };
  bluetooth_le: {
    enabled: boolean;
  };
  lan: {
    enabled: boolean;
    mdns_enabled: boolean;
    multicast_enabled: boolean;
  };
  wifi_aware: {
    enabled: boolean;
  };
}

interface TransportConfig {
  cloud: CloudConfig;
  connect: ConnectConfig;
  global: GlobalConfig;
  listen: {
    http: HttpConfig;
    tcp: TcpConfig;
  };
  peer_to_peer: PeerToPeerConfig;
}

interface TransportConfigChangeEvent {
  cfg: TransportConfig;
  timestamp: string;
}

export interface Peer {
  _id: string;
  big_peer_connection_history: ConnectionHistoryEvent[];
  connections_by_transport: ConnectionsByTransport;
  device_disk_usage: DeviceDiskUsage;
  device_name: string;
  ditto_sdk_commit: string;
  ditto_sdk_language: string;
  ditto_sdk_platform: string;
  ditto_sdk_version: string;
  identity_service_metadata: null;
  last_updated_at: string;
  local_subscriptions: LocalSubscriptions;
  logs_config: LogsConfig;
  metadata: {
    location: string;
    role: string;
  };
  peer_metadata: null;
  reaper: Reaper;
  store: Store;
  transport_config_change_events: TransportConfigChangeEvent[];
  version: number;
} 