import { create } from 'zustand';

interface PopulateCacheState {
  indexedItems: any;
}

interface PopulateCacheActions {
  addIndexItem: (path: string, item) => void;
  setIndexedItems: (items: any) => void;
}

export const usePopulateCacheStore = create<PopulateCacheState & PopulateCacheActions>((set) => ({
  indexedItems: {},
  addIndexItem: (path, item) => {
    set((state) => ({
      indexedItems: {
        ...state.indexedItems,
        [path]: item
      }
    }));
  },
  setIndexedItems: (items) => {
    set({ indexedItems: items });
  }
}));
