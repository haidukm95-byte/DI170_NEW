import { useSelector } from 'react-redux';
import { selectFantasyBooks } from '../state/slice';

export default function SelectFantasy() { 
    const fantasyBooks = useSelector(selectFantasyBooks);

    return (
    <div className='books-select-genre-wrapper'>
        {fantasyBooks.map((book) => (
            <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{ book.author}</p>
            </div>
        ))}
    </div>
)
}
