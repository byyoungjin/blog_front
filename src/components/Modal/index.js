import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectors } from "data";
import SimpleModal from "./SimpleModal";
import PopulateEditorState from "./PopulateEditorState";
import InfoModal from "./InfoModal";
import DeletePostModal from "./DeletePost";
import DeleteTagModal from "./DeleteTagModal";

const MODAL_COMPONENTS = {
  SIMPLE_MODAL: SimpleModal,
  POPULATE_MODAL: PopulateEditorState,
  INFO_MODAL: InfoModal,
  DELETE_POST: DeletePostModal,
  DELETE_TAG: DeleteTagModal
};

export default function Modal() {
  const { modalType, modalProps } = useSelector(selectors.modal.getModal);

  const SpecificModal = modalType
    ? MODAL_COMPONENTS[modalType]
    : () => <Disapear>뿅</Disapear>;
  return (
    <Container modalType={modalType}>
      <SpecificModal {...modalProps} />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ modalType }) =>
    modalType ? "translateY(0);" : "translateY(-100%);"}
    opacity: ${({ modalType }) => (modalType ? "1" : "0")} ;
  transition: transform .5s cubic-bezier(.5,-0.67,.42,1.34), opacity .5s cubic-bezier(.5,-0.67,.42,1.34);
`;

const Disapear = styled.div`
  font-size: 32px;
`;
