import { useState } from 'react';

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key) => {
  return getQuery().get(key) || '';
};

export const useQueryParam = (
  key,
  defaultVal
) => {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

  const updateUrl = (newVal) => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.replaceState(null, null, newUrl);
    }
  };

  return [query, updateUrl];
};

export function useQuery (key) {
  const [query, setQuery] = useState(getQueryStringVal(key))

  /**
   * @param {string} url
   */
  function push (url) {
    window.history.pushState(null, null, url)
  }

  const handleChange = (newVal) => {

    setQuery(newVal);

    const query = getQuery();
    
    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    push(`?${query.toString()}`)
  }

  
  return [query, handleChange]
}