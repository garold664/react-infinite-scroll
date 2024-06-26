import { useState, useRef, useCallback } from 'react';

import './App.css';
import useBookSearch from './useBookSearch';
import { DotLoader } from 'react-spinners';
import ErrorMessage from './ErrorMessage';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { books, loading, errorMessage, hasMore } = useBookSearch(
    query,
    pageNumber
  );

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    // if (event.target.value.length === 0) return;
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

      {loading && (
        <div className="spinner">
          <DotLoader color="darkblue" />
        </div>
      )}
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </>
  );
}

export default App;
