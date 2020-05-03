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

  return { modal, setUpModal, setDownModal };
};
