import { useRef } from "react";

export interface Book{
    name: string;
    author: string;
    genre?: string;
    yearPublished?: number;
}

interface BookListProps {
    onAdd: (book: Book) => void;
}

export default function BookList({ onAdd }: BookListProps){
    const nameRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const genreRef = useRef<HTMLInputElement>(null);
    const publishedRef = useRef<HTMLInputElement>(null);

    function addItem(){
        const newBook: Book = {
            name: nameRef.current?.value || "",
            author: authorRef.current?.value || "",
            genre: genreRef.current?.value || undefined,
            yearPublished: publishedRef.current?.value ? Number(publishedRef.current.value) : undefined,
        };
        onAdd(newBook);
    }

    return(
        <div>
            <h2>Add a new book</h2>
            <input ref={nameRef} placeholder="Name"/>
            <input ref={authorRef} placeholder="Author"/>
            <input ref={genreRef} placeholder="Genre"/>
            <input ref={publishedRef} placeholder="Publishing Year"/>
            <button onClick={addItem}>Add new book</button>
        </div>
    )
    

}



