import { useRef } from "react";

export interface Book {
    id: string;
    title: string;
    author: string;
    genre?: string;
    yearPublished?: number;
}

interface AddBookFormProps {
    onAdd: (book: Book) => void;
}

export default function AddBookForm({ onAdd }: AddBookFormProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const publishedRef = useRef<HTMLInputElement>(null);

    function handleAdd(){
        const newBook: Book = {
            id: crypto.randomUUID(),
            title: titleRef.current?.value || "",
            author: authorRef.current?.value || "",
            genre: genreRef.current?.value || undefined,
            yearPublished: publishedRef.current?.value ? Number(publishedRef.current.value) : undefined,
        };
        onAdd(newBook);
    }

    return(
        <div>
            <h2>Add a new book</h2>
            <input ref={titleRef} placeholder="Title"/>
            <input ref={authorRef} placeholder="Author"/>
            <input ref={genreRef} placeholder="Genre"/>
            <input ref={publishedRef} placeholder="Publishing Year"/>
            <button onClick={handleAdd}>Add new book</button>
        </div>
    );
}
