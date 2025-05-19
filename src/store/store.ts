import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDitto } from '../config/ditto';
import type { DQLQueryArguments, DQLQueryArgumentValue, SyncSubscription, StoreObserver } from '@dittolive/ditto';
import type { Peer } from '../types/peer';

export type Group = {
  _id: string;
  name: string;
}

interface Store {
  groups: Group[];
  peers: Peer[];
  subscriptions: SyncSubscription<DQLQueryArguments>[];
  observers: StoreObserver<any, DQLQueryArguments>[];
  deviceStalenessTime: number;
  remoteQueryRefreshInterval: number;
  addGroup: (group: Group) => void;
  deleteGroup: (group: Group) => void;
  setDeviceStalenessTime: (time: number) => void;
  setRemoteQueryRefreshInterval: (interval: number) => void;
  initialize: () => void;
  cleanup: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      groups: [],
      peers: [],
      subscriptions: [],
      observers: [],
      deviceStalenessTime: 300, // Default to 5 minutes
      remoteQueryRefreshInterval: 30, // Default to 30 seconds
      addGroup: async (group: Group) => {
        const ditto = getDitto();
        await ditto.store.execute('INSERT INTO __group_config DOCUMENTS (:doc)', { doc: group as DQLQueryArgumentValue });
      },
      deleteGroup: async (group: Group) => {
        const ditto = getDitto();
        await ditto.store.execute('DELETE FROM __group_config WHERE _id = (:id)', { id: group._id });
      },
      setDeviceStalenessTime: (time: number) => set({ deviceStalenessTime: time }),
      setRemoteQueryRefreshInterval: (interval: number) => set({ remoteQueryRefreshInterval: interval }),
      initialize: async () => {
        // Clean up any existing observers and subscriptions
        get().cleanup();

        const ditto = getDitto();
        const spSubscription = ditto.sync.registerSubscription("SELECT * FROM __small_peer_info");
        const spObserver = ditto.store.registerObserver("SELECT * FROM __small_peer_info", (result) => {
          const peers = result.items.map((peer) => peer.value) || [];
          console.log("peers", peers);
          set({ peers });
        });

        const gpSubscription = ditto.sync.registerSubscription("SELECT * FROM __group_config");
        const gpObserver = ditto.store.registerObserver("SELECT * FROM __group_config", (result) => {
          const groups = result.items.map((group) => group.value)|| [];
          console.log("groups", groups);
          set({ groups });
        });

        set({subscriptions: [spSubscription, gpSubscription], observers: [spObserver, gpObserver]});
      },
      cleanup: () => {
        const { subscriptions, observers } = get();
        subscriptions.forEach(subscription => subscription.cancel());
        observers.forEach(observer => observer.cancel());
        set({ subscriptions: [], observers: [] });
      }
    }),
    {
      name: 'ditto-storage',
      partialize: (state) => ({
        groups: state.groups,
        peers: state.peers,
        deviceStalenessTime: state.deviceStalenessTime,
        remoteQueryRefreshInterval: state.remoteQueryRefreshInterval,
      }),
    }
  )
);

export const usePeersStore = () => useStore((state) => state.peers)
export const useGroupsStore = () => useStore((state) => state.groups)