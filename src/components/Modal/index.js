import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectors } from "data";
import { useTransitionTranslates } from "hooks";

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

  const { TransitionUpWrapper } = useTransitionTranslates({
    containerStyle: {
      position: "fixed",
      top: 0,
      zIndex: 200,
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  const SpecificModal = modalType ? MODAL_COMPONENTS[modalType] : "";
  return modalType ? (
    <TransitionUpWrapper>
      <Container modalType={modalType}>
        <SpecificModal {...modalProps} />
      </Container>
    </TransitionUpWrapper>
  ) : (
    ""
  );
}

const Container = styled.div`
  
  /* transform: ${({ modalType }) =>
    modalType ? "translateY(0);" : "translateY(-100%);"}
    opacity: ${({ modalType }) => (modalType ? "1" : "0")} ;
  transition: transfform .5s cubic-bezier(.5,-0.67,.42,1.34), opacity .5s cubic-bezier(.5,-0.67,.42,1.34); */
`;
