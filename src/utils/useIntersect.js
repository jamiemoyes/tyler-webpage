import {useState, useEffect } from "react"

export default (ref, rootMargin = "0px") => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    var currentRef = null;
    if (ref.current) {
      observer.observe(ref.current);
      currentRef = ref.current;
    }
    return () => {
      if (! currentRef) observer.unobserve(currentRef);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
