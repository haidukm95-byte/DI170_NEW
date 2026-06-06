import { useState } from "react";
import BookList from "./List";
import type { Book } from "./List";

export default function BookApp(){
    const [booklist, setBooklist] = useState<Book[]>([]);

    function renderItem(book: Book){
        return(
            <div key={book.name + book.author}>
                <h3>{book.name}</h3>
                <p>Author: {book.author}</p>
                {book.genre && <p>Genre: {book.genre}</p>}
                {book.yearPublished && <p>Published: {book.yearPublished}</p>}
            </div>
        );
    }

    return(
        <div>
            <BookList onAdd={(book) => setBooklist([...booklist, book])} />
            <h2>Book List</h2>
            {booklist.map(renderItem)}
        </div>
    );
}
