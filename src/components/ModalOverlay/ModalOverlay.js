import overlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({onClose}) {
  
  return (
    <div className={overlayStyles.overlay} onMouseDown={onClose}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default ModalOverlay;