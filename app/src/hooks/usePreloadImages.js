import { useState, useEffect } from 'react';

const TIMEOUT_MS = 8000;
const MIN_DISPLAY_MS = 1500;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

export function usePreloadImages(urls) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!urls?.length) {
      setReady(true);
      return;
    }
    const start = Date.now();
    const timeoutId = setTimeout(() => setReady(true), TIMEOUT_MS);
    Promise.all(urls.map(loadImage)).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        setReady(true);
        clearTimeout(timeoutId);
      }, remaining);
    });
    return () => clearTimeout(timeoutId);
  }, [urls?.join(',')]);

  return ready;
}
