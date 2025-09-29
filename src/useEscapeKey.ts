import { useEffect } from 'react';

const useEscapeKey = (callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the pressed key is the Escape key (keyCode 27 or key 'Escape')
      if (event.keyCode === 27 || event.key === 'Escape') {
        callback(); // Execute the provided callback function
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]); // Re-run effect if callback changes
};

export default useEscapeKey;
