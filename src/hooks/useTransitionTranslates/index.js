import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";

import { actions, selectors } from "data";

export const useTransitionTranslates = () => {
  const dispatch = useDispatch();
  const isMounted = useSelector(selectors.routing.getIsMounted);
  const transitionLeft = useTransition(isMounted, null, {
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    onDestroyed: () => dispatch(actions.routing.unmount())
  });
  const transitionRight = useTransition(isMounted, null, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(100%,0,0)" },

    onDestroyed: () => dispatch(actions.routing.unmount())
  });

  useEffect(() => {
    dispatch(actions.routing.setIsMounted(true));
    console.log("loaded");
    return () => {
      dispatch(actions.routing.setIsMounted(false));

      console.log("unloaded");
    };
  }, []);

  const [TransitionLeftWrapper, TransitionRightWrapper] = [
    transitionLeft,
    transitionRight
  ].map(transition => ({ children }) =>
    transition.map(({ item: isMounted, props, key }) =>
      isMounted ? (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      ) : (
        ""
      )
    )
  );

  return { TransitionLeftWrapper, TransitionRightWrapper };
};
