import React from 'react'
import css from './NoteList.module.css'
import type { NotesProps } from '../../types/note'
import type { ToDoFormValues } from '../NoteForm/NoteForm';

interface NoteListProps{
    notes: NotesProps[];
    onDelete: (id: string) => void;
}

const NoteList = ({notes, onDelete}: NoteListProps) => {
  return (
    <ul className={css.list}>
    {notes.map(note => (
        <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        </li>
    ))}
    </ul>
  )
}

export default NoteList
