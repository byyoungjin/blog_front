import { useSelector, useDispatch } from "react-redux";

import { actions, selectors } from "data";

export const useModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectors.modal.getModal);

  const setUpModal = content => {
    dispatch(actions.modal.setModalUp(content));
  };
  const setDownModal = () => {
    dispatch(actions.modal.setModalDown());
  };

  const modalUpAndGo = ({ content }) => {
    dispatch(actions.modal.setModalUp(content));
    setTimeout(() => {
      dispatch(actions.modal.setModalDown());
    }, 1000);
  };

  return { modal, setUpModal, setDownModal, modalUpAndGo };
};
