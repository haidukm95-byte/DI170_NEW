import { useSelector } from 'react-redux';
import { selectScienceFictionBooks } from '../state/slice';

export default function SelectSciFi() { 
    const sciFiBooks = useSelector(selectScienceFictionBooks);

    return (
    <div className='books-select-genre-wrapper'>
        {sciFiBooks.map((book) => (
            <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{ book.author}</p>
            </div>
        ))}
    </div>
)
}
