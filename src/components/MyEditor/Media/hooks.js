import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "data";

export const useSetPostData = () => {
  const dispatch = useDispatch();
  const title = useSelector(selectors.editorState.getTitle);
  const titlePhoto = useSelector(selectors.editorState.getTitlePhoto);
  const subTitle = useSelector(selectors.editorState.getSubTitle);

  const setTitlePhoto = titlePhotoUrl => {
    titlePhoto === null &&
      dispatch(actions.editorState.setTitlePhoto(titlePhotoUrl));
  };

  const setTitle = titleText => {
    title === null && dispatch(actions.editorState.setTitle(titleText));
  };

  const setSubTitle = subTitleText => {
    subTitle === null &&
      dispatch(actions.editorState.setSubTitle(subTitleText));
  };

  return { setTitlePhoto, setTitle, setSubTitle };
};
