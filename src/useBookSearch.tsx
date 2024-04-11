import { useState, useEffect, useRef } from 'react';
import axios, { Canceler } from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default function useBookSearch(query: string, pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  let timerId = useRef<null | number>(null);
  let cancel: Canceler;
  useEffect(() => {
    if (typeof timerId.current === 'number') {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setLoading(true);
      setError(false);
      console.log('start loading');
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
          if (query === '') {
            return;
          }
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
    }, 500);
    return () => {
      if (cancel) {
        cancel();
      }
    };
  }, [query, pageNumber]);

  return { books, loading, error, hasMore };
}
