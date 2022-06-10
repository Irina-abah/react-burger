import { FunctionComponent, FormEvent } from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IOverlay {
  onClose: (e: FormEvent) => void,
}

const ModalOverlay: FunctionComponent<IOverlay> = ({ onClose }) => {

  return (
    <div className={overlayStyles.overlay} onMouseDown={onClose}></div>
  )
}


export default ModalOverlay;