import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "data";

export default function useWhoAmI() {
  const dispatch = useDispatch();
  const whoAmIRemote = useSelector(selectors.user.getWhoAmI);

  useEffect(() => {
    dispatch(actions.user.whoAmI());
  }, []);

  return whoAmIRemote;
}
