import { RefObject, useEffect } from "react";

type THandler = () => void;

export function useClickAway(ref: RefObject<HTMLElement>, handler: THandler) {
  useEffect(
    () => {
      const handleClickAway = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", handleClickAway);
      document.addEventListener("touchstart", handleClickAway);
      return () => {
        document.removeEventListener("mousedown", handleClickAway);
        document.removeEventListener("touchstart", handleClickAway);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
