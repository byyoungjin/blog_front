import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { actions } from "data";
import Colors from "theme/colors";

export default function DeletePost({ postId }) {
  const dispatch = useDispatch();
  return (
    <ModalComp>
      <div>이 포스트를 삭제하시겠습니까?</div>
      <button
        onClick={() => {
          dispatch(actions.post.deletePost(postId));
          dispatch(actions.modal.setModalDown());
          dispatch(actions.modal.modalUpAndGo("deleted!"));
        }}
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
