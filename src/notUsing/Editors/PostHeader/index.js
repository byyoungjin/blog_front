import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { saveContent, populateEditorState } from "../helper";
import { actions, selectors } from "data";

function PostHeader({
  className,
  editorTitleState,
  editorContentState,
  setEditorTitleState,
  setEditorContentState,
  buttons = ["save", "load", "create", "goback"],
  postId
}) {
  const dispatch = useDispatch();
  const UserId = useSelector(selectors.user.getUserId);
  const [del, setDel] = useState(false);
  const postData = {
    editorTitleState,
    editorContentState,
    UserId
  };

  const _handleSave = () =>
    saveContent({ editorContentState, editorTitleState });

  const _handleLoad = () => {
    populateEditorState("DraftEditorTitleJson", setEditorTitleState)();
    populateEditorState("DraftEditorContentJson", setEditorContentState)();
  };

  const _handleCreator = () => {
    dispatch(actions.post.createPost(postData));
  };

  const _handleUpdate = () => {
    dispatch(actions.router.push(`/postUpdate/${postId}`));
  };

  const _handleUpdatedCreate = () => {
    dispatch(actions.post.updatePost({ postId, newPost: postData }));
  };

  const _handleGoBack = () => {
    dispatch(actions.router.push("/"));
  };

  const _handleDelete = () => {
    setDel(true);
  };

  const _handleDeleteConfirm = () => {
    dispatch(actions.post.deletePost(postId));
  };

  const buttonCollections = {
    save: <StyledButton onClick={_handleSave}>저장</StyledButton>,
    load: <StyledButton onClick={_handleLoad}>불러오기</StyledButton>,
    create: <StyledButton onClick={_handleCreator}>발행</StyledButton>,
    update: <StyledButton onClick={_handleUpdate}>수정</StyledButton>,
    updateCreate: (
      <StyledButton onClick={_handleUpdatedCreate}>수정 발행</StyledButton>
    ),
    goback: <StyledButton onClick={_handleGoBack}>뒤로가기</StyledButton>,
    delete: (
      <>
        <StyledButton
          onClick={_handleDelete}
          style={{ display: del ? "none" : "block" }}
        >
          삭제
        </StyledButton>
        <StyledButton
          onClick={_handleDeleteConfirm}
          style={{ display: del ? "block" : "none" }}
        >
          삭제 확인
        </StyledButton>
      </>
    )
  };

  return (
    <div className={className}>
      {buttons.map(button => buttonCollections[button])}
    </div>
  );
}

const StyledPostHeader = styled(PostHeader)`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  border-radius: 33px;
  border: 1px solid #bbb
  color: #666;
  margin: 10px;
  font-size: 12px;
  width: 66px;
  height: 30px;
  text-align: center;
`;

export default StyledPostHeader;
