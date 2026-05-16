import { useSelector } from 'react-redux';
import { selectHorrorBooks } from '../state/slice';

export default function SelectHorror() { 
    const horrorBooks = useSelector(selectHorrorBooks);

    return (
    <div className='books-select-genre-wrapper'>
        {horrorBooks.map((book) => (
            <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{ book.author}</p>
            </div>
        ))}
    </div>
)
}
