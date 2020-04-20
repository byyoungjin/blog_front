import { useDispatch, useSelector } from "react-redux";

import { selectors, actions } from "data";

export default function useModal() {
  const dispatch = useDispatch();
  const modal = useSelector(selectors.modal.getModal);
  const modalUpAndGo = () => {
    dispatch(actions.modal.setModalUp());
    setTimeout(() => {
      dispatch(actions.modal.setModalDown());
    }, 1000);
  };

  return { modalUpAndGo, modal };
}
