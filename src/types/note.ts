export interface Note {
    id: string;
    title: string;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    tag: string;
}