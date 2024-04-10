import { useState, useEffect, useRef, useCallback } from 'react';

import './App.css';
import useBookSearch from './useBookSearch';
import { DotLoader } from 'react-spinners';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { books, loading, error, hasMore } = useBookSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Visibel');
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      console.log(node);
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  const booksList = books.map((book, index) => {
    if (books.length === index + 1) {
      return (
        <div ref={lastBookElementRef} key={book} className="book-title">
          {book}
        </div>
      );
    } else {
      return (
        <div key={book} className="book-title">
          {book}
        </div>
      );
    }
  });

  return (
    <>
      <input type="text" onChange={handleSearch} className="search" />
      {booksList.length > 0 && booksList}
      {true && (
        <div className="spinner">
          <DotLoader color="darkblue" />
        </div>
      )}
      {error && <div className="error">Error</div>}
    </>
  );
}

export default App;
