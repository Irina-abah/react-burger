import overlayStyles from "./ModalOverlay.module.css";

function ModalOverlay({onClose}) {
  
  return (
    <div className={overlayStyles.overlay} onMouseDown={onClose}></div>
  )
}

export default ModalOverlay;