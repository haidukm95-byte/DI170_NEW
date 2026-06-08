import { useState } from "react";
import AddBookForm from "./AddBookForm";
import type { Book } from "./AddBookForm";
import List from "./List";

export default function BookApp(){
    const [booklist, setBooklist] = useState<Book[]>([]);

    return(
        <div>
            <AddBookForm onAdd={(book) => setBooklist([...booklist, book])} />
            <h2>Book List</h2>
            <List
                items={booklist}
                renderItem={(book) => (
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        {book.genre && <p>Genre: {book.genre}</p>}
                        {book.yearPublished && <p>Published: {book.yearPublished}</p>}
                    </div>
                )}
            />
        </div>
    );
}
