import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

export const useFade = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const transition = useTransition(isLoaded, null, {
    from: { opacity: 0, transform: "translate3d(0,30%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,30%,0)" }
  });

  const FadeWrapper = ({ children }) =>
    transition.map(({ item: isLoaded, props, key }) =>
      isLoaded ? (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      ) : null
    );

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);
  return { FadeWrapper };
};
