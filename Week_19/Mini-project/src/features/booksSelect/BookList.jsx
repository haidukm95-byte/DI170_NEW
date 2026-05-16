import { useSelector } from 'react-redux';

import { selectBooks } from '../state/slice';

export default function BooksList() {
    const booksList = useSelector(selectBooks);

    return (
        <div className='books-select-all-wrapper'>
            {booksList.map((book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                </div>
            ))}
        </div>    
    )
}