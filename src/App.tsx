import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <>
      <input type="text" />
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>Loading</div>
      <div>Error</div>
    </>
  );
}

export default App;
