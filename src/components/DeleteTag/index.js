import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { actions } from "data";
import Colors from "theme/colors";
import { shadowClickableBox } from "theme/style";
import DeleteTagModal from "components/Modal/DeleteTagModal";

export default function DeleteTag({ tagId }) {
  const dispatch = useDispatch();
  const deleteTagHandler = () => {
    dispatch(
      actions.modal.setModalUp({
        modalType: "DELETE_TAG",
        modalProps: { tagId }
      })
    );
  };
  return (
    <Container>
      <Text>해당 테그를 가진 포스트가 없습니다.</Text>
      <DeleteButton onClick={deleteTagHandler}>테그 지우기</DeleteButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Text = styled.div`
  font-size: 40px;
  color: ${Colors.gray_1};
`;
const DeleteButton = styled(shadowClickableBox)`
  margin: 10px;
  padding: 10px;
  background-color: ${Colors.pink};
`;
