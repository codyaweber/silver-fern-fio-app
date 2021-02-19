import { useEffect } from 'react';

/**
 * Custom hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);
}

export default useOutsideAlerter;
