"use client";
import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      // setDebouncedValue(value?.toLowerCase() || "");
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, 500]);

  return debouncedValue;
};

export default useDebounce;
