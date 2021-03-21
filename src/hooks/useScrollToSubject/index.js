import { useEffect } from "react";

export const useScrollToSubject = ({ elementRef, currentId }) => {
  const scrollToSubject = () => {
    const currentLocation = window.location.href;
    const hasSubjectAnchor = currentLocation.includes("#");
    if (hasSubjectAnchor) {
      const anchorSubjectId = currentLocation.substring(
        currentLocation.indexOf("#") + 1
      );
      console.log(`anchorSubjectId, currentId`, anchorSubjectId, currentId);

      if (anchorSubjectId === currentId) {
        if (elementRef.current) {
          elementRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    scrollToSubject();
  }, []);
};
