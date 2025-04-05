import { LiaTimesSolid } from 'react-icons/lia';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  background?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  background = 'bg-white',
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeOnOutsideClick ? onClose : undefined}
      ></div>
      <div
        className={`${background} max-h-[90vh] overflow-x-hidden  overflow-y-auto rounded-lg z-10 relative`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer hover:bg-gray-300 transition-colors p-0.5 rounded-full"
          onClick={onClose}
        >
          <LiaTimesSolid />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
