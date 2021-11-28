import overlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClose}) {
  
  return (
    <div className={overlayStyles.overlay} onMouseDown={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired

};

export default ModalOverlay;