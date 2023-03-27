import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
};

export { useDebounce };
