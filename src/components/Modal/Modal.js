import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal({onClose, title, children}) {

  function handleClick(evt) {
      onClose()
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        console.log(evt.target)
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
    document.removeEventListener('keydown', handleEscClose);
    }
  }, [onClose]);

  return createPortal(
    <>
    <ModalOverlay onClose={handleClick}/>
    <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
    <div className={modalStyles.header}>
      <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>
      <div className={modalStyles.icon}>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>
    </div>
      {children}
    </div>
    </>, modalRoot
  ) 
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;