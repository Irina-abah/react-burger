import overlayStyles from "./ModalOverlay.module.css";

function ModalOverlay({onClose}) {
  return (
    <div className={overlayStyles.overlay}>
    </div>
  )
}

export default ModalOverlay;