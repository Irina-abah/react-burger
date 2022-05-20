import overlayStyles from "./modal-overlay.module.css";
import { FunctionComponent, FormEvent } from "react";

interface IOverlay {
  onClose: (e: FormEvent) => void,
}

const ModalOverlay: FunctionComponent<IOverlay> = ({ onClose }) => {

  return (
    <div className={overlayStyles.overlay} onMouseDown={onClose}></div>
  )
}


export default ModalOverlay;