"use client"
import React from 'react';
import useModalStore from '@/store/Modal.store';

export const Modal = () => {
  const { modals, closeModal } = useModalStore();

  if (!modals.length) return null;
  return (
    <>
      {modals.map((modal) => (
        <div key={modal.id} className="modal modal-open">
          <div className="modal-box w-[80%] mx-auto max-w-3xl relative bg-white">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white"
              onClick={() => closeModal()}
            >
              ✕
            </button>
            {modal.render}
          </div>
        </div>
      ))}
    </>
  );
};
