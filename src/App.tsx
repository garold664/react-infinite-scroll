import { useState, useEffect } from 'react';

import './App.css';
import useBookSearch from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const books = useBookSearch(query, pageNumber);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  const booksList = books.map((book) => <div key={book}>{book}</div>);

  return (
    <>
      <input type="text" onChange={handleSearch} />
      {booksList}
      {/* <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading</div>
      <div>Error</div> */}
    </>
  );
}

export default App;
