import { useState, useEffect } from 'react';

import './App.css';
import useBookSearch from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  const booksList = books.map((book) => <div key={book}>{book}</div>);

  return (
    <>
      <input type="text" onChange={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {booksList.length > 0 && booksList}
    </>
  );
}

export default App;
