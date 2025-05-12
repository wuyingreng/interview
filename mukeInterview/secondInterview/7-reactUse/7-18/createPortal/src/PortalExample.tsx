import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div onClick={() => { console.log('portal 点击事件也冒泡上来了') }}>
      <button onClick={() => setShowModal(true)}>
        使用 portal 展示模态（motal）
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </div>
  );
}
