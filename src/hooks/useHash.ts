import { useState, useEffect, useCallback } from "react";

export const useHash = () => {
  const [hash, setHash] = useState<string>();

  const handleHashChange = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [handleHashChange]);

  return hash;
};
