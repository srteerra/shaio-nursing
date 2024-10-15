import { create } from 'zustand';

interface Modal {
  id: number;
  title: string;
  render: JSX.Element;
}

interface ModalStore {
  modals: Modal[];
  openModal: (title: string, render: JSX.Element) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (title, render) => set((state) => ({
    modals: [...state.modals, { id: Date.now(), title, render }],
  })),
  closeModal: () => set((state) => ({
    modals: state.modals.slice(0, -1),
  })),
  closeAllModals: () => set({ modals: [] }),
}));

export default useModalStore;
