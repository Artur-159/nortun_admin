import { useEffect } from "react";

/**
 * Hook that triggers a callback when a click is detected outside the specified element.
 *
 * @param {Object} ref - A React ref object pointing to the element to detect outside clicks.
 * @param {Function} callback - The function to be called when a click occurs outside the referenced element.
 */

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (e) =>
      ref.current && !ref.current.contains(e.target) && callback();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
};

export default useOutsideClick;
