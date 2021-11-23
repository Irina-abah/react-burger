import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import modalStyles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal({isOpen, onClose, title, children}) {

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
    isOpen && ( 
    <>
    <ModalOverlay onClose={handleClick}/>
    <div className={`${modalStyles.container} pt-10 pr-10 pb-15 pl-10`}>
    <div className={modalStyles.header}>
      <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
      {children}
    </div>
    </>), modalRoot
  ) 
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;