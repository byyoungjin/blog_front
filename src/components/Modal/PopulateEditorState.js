import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";
import Colors from "theme/colors";

export default function PopulateEditorState() {
  const dispatch = useDispatch();
  return (
    <ModalComp>
      {" "}
      <div>이전에 작성하던글을 이어서 작성하시겠습니까?</div>
      <button
        onClick={() => dispatch(actions.editorState.loadSavedEditorState())}
      >
        네
      </button>
      <button onClick={() => dispatch(actions.modal.setModalDown())}>
        아니오
      </button>
    </ModalComp>
  );
}

const ModalComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-align: center;
  line-height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${Colors.yellow};
`;
