import { useState } from 'react'
import { useSelector } from 'react-redux';
import './App.css'
import BooksList from './features/booksSelect/BookList';
import SelectFantasy from './features/booksSelect/Fantasy';
import SelectHorror from './features/booksSelect/Horror';
import SelectSciFi from './features/booksSelect/SciFi';
import './features/library.png';
import './features/horror.png';
import './features/fantasy.png';
import './features/library.png';


function App() {

  const [showBooks, setShowBooks] = useState(false);
  const [showScifiBooks, setShowScifiBooks] = useState(false);
  const [showFantasyBooks, setShowFantasyBooks] = useState(false);
  const [showHorrorBooks, setShowHorrorBooks] = useState(false);

  return (
    <div id='main-wrapper'>
      <div id='books-list'>
        <h2><button onClick={() => setShowBooks(prev => !prev)}>{showBooks ? 'Hide' : 'View the entire booklist'}</button></h2>
        <div className='books-names'>{showBooks && <BooksList />}</div>
      </div>

      <div id='books-list-scifi'>
        <h2><button onClick={() => setShowScifiBooks(prev => !prev)}>{showScifiBooks ? 'Hide' : 'Science Fiction'}</button></h2>
        <div className='books-names'>{showScifiBooks && <SelectSciFi />}</div>
      </div>

      <div id='books-list-fantasy'>
        <h2><button onClick={() => setShowFantasyBooks(prev => !prev)}>{showFantasyBooks ? 'Hide' : 'Fantasy'}</button></h2>
        <div className='books-names'>{showFantasyBooks && <SelectFantasy />}</div>
      </div>

      <div id='books-list-horror'>
        <h2><button onClick={() => setShowHorrorBooks(prev => !prev)}>{showHorrorBooks ? 'Hide' : 'Horror'}</button></h2>
        <div className='books-names'>{showHorrorBooks && <SelectHorror />}</div>
      </div>


    </div>
  )
}

export default App
