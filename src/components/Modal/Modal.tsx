import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import NoteForm, { type ToDoFormValues } from '../NoteForm/NoteForm'

interface ModalProps {
  onClose: () => void;
  onPost: (valuse: ToDoFormValues) => void;
}

const Modal = ({ onClose, onPost }: ModalProps) => {
  return createPortal((
    <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
    >
        <div className={css.modal}>
            <NoteForm onPost={onPost} onClose={onClose} />
        </div>
    </div>
  ), document.body)
}

export default Modal
