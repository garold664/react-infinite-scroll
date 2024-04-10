import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: 'GET',
      url: `https://openlibrary.org/search.json`,
      params: {
        q: query,
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res.data.docs.map((b: { title: string }) => b.title),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, pageNumber]);

  return { books, loading, error, hasMore };
}
