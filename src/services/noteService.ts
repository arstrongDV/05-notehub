import axios from "axios";
import type { NotesProps } from "../types/note";

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api/',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
    }
})

interface fetchNotesResponse {
    notes: NotesProps[];
    totalPages: number;
}
interface FetchNotesProps {
    page: number, 
    search: string
}
export const fetchNotes = async (params: FetchNotesProps): Promise<fetchNotesResponse> => {
    const res = await api.get('/notes', {params: params});
    return res.data;
};

interface NotesData {
    title: string;
    content: string;
    tag: string;
}
export const createNote = async (data: NotesData): Promise<fetchNotesResponse> => {
    const res = await api.post('/notes', data);
    return res.data;
};


export const deleteNote = async (id: string): Promise<fetchNotesResponse> => {
    const res = await api.delete(`/notes/${id}`);
    return res.data;
};
