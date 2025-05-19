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
  addGroup: (group: Group) => void;
  deleteGroup: (group: Group) => void;
  initialize: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      groups: [],
      peers: [],
      subscriptions: [],
      observers: [],
      addGroup: async (group: Group) => {
        const ditto = getDitto();
        await ditto.store.execute('INSERT INTO __group_config DOCUMENTS (:doc)', { doc: group as DQLQueryArgumentValue });
      },
      deleteGroup: async (group: Group) => {
        const ditto = getDitto();
        await ditto.store.execute('DELETE FROM __group_config WHERE _id = (:id)', { id: group._id });
      },
      initialize: async () => {
        const ditto = getDitto();
        const spSubscription = ditto.sync.registerSubscription("SELECT * FROM __small_peer_info");
        const spObserver = ditto.store.registerObserver("SELECT * FROM __small_peer_info", (result) => {
          const peers = result.items.map((peer) => peer.value);
          set({peers});
        });

        const gpSubscription = ditto.sync.registerSubscription("SELECT * FROM __group_config");
        const gpObserver = ditto.store.registerObserver("SELECT * FROM __group_config", (result) => {
          const groups = result.items.map((group) => group.value);
          set({groups});
        });

        set({subscriptions: [spSubscription, gpSubscription], observers: [spObserver, gpObserver]});
      }
    }),
    {
      name: 'ditto-storage',
      partialize: (state) => ({
        groups: state.groups,
        peers: state.peers,
      }),
    }
  )
);

export const usePeersStore = () => useStore((state) => state.peers)
export const useGroupsStore = () => useStore((state) => state.groups)