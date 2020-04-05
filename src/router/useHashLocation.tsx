import { useState, useEffect, useCallback } from "react";

// returns the current hash location (excluding the '#' symbol)
const currentLocation = () => {
  return window.location.hash.replace("#", "") || "/";
}

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    console.log(`useEffect`);
    
    const handler = () => setLoc(currentLocation());

    // subscribe on hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = useCallback(to => (window.location.hash = to), []);
  return [loc, navigate] as any;
};

export default useHashLocation;