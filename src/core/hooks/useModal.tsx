import useModalStore from '@/store/Modal.store';

interface ModalProps {
  title: string;
  render: JSX.Element;
}

const useModal = () => {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const closeAllModals = useModalStore((state) => state.closeAllModals);

  const showModal = ({ title, render }: ModalProps) => {
    openModal(title, render);
  };

  return {
    showModal,
    closeModal,
    closeAllModals,
  };
};

export default useModal;
