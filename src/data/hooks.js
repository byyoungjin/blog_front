import { useDispatch, useSelector } from "react-redux";

export const useTheSelector = selector => {
  return useSelector(selector);
};

export const useTheDispatch = action => {
  const dispatch = useDispatch();
  dispatch(action);
};
