export default function ModalContent({ onClose }) {
  return (
    <div className="modal">
      <div>这是一个模态对话框</div>
      <button onClick={onClose}>关闭</button>
    </div>
  );
}
