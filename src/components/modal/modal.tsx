import { useEffect, FunctionComponent} from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModal {
  onClose: () => void,
  title: string
}

const Modal: FunctionComponent<IModal> = ({onClose, title, children}) => {

  function handleClick() {
      onClose()
  }

  useEffect(() => {
    function handleEscClose(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        console.log(e.target)
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
    <div className={`${modalStyles.container} p-10`}>
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

export default Modal;