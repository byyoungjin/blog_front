import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Formik, Form } from "formik";

import { actions, selectors } from "data";
import MyUrlInput from "components/Input/MyUrlInput";
import SplashSelect from "components/MyEditor/Blocks/SplashSelect";
import { Row } from "components/Layout";

import { useFocus } from "../hooks";

export default function SplashSearch() {
  const dispatch = useDispatch();
  const [imagesData, setImagesData] = useState(false);
  const [sumitted, setSumitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentBlockKey, setCurrentBlockKey] = useState(null);
  const editorState = useSelector(selectors.editorState.getEditorState);
  const selectionState = editorState.getSelection();
  const focusKey = selectionState.getFocusKey();
  console.log("currentBlockKey", currentBlockKey);
  console.log("focusKey", focusKey);

  useEffect(() => {
    if (currentBlockKey === null) {
      setCurrentBlockKey(focusKey);
    } else {
      if (focusKey !== currentBlockKey) {
        dispatch(
          actions.editorState.toggleBlock({
            blockType: "unstyled",
            blockKey: currentBlockKey
          })
        );
      }
    }
  }, [focusKey, currentBlockKey, dispatch]);

  const container = useFocus();

  const { filterdResult, totalImageNumber, totalPages } = imagesData;

  const submitHandler = async values => {
    const { keyword } = values;
    dispatch(
      actions.editorState.submitSplashInput({
        keyword,
        currentPage,
        setImagesData
      })
    );
    setSumitted(true);
    setCurrentKeyword(keyword);
  };

  const clickPreviousHandler = () => {
    dispatch(
      actions.editorState.submitSplashInput({
        keyword: currentKeyword,
        currentPage: currentPage - 1,
        setImagesData
      })
    );
    setCurrentPage(prev => prev - 1);
  };

  const clickNextHandler = () => {
    dispatch(
      actions.editorState.submitSplashInput({
        keyword: currentKeyword,
        currentPage: currentPage + 1,
        setImagesData
      })
    );
    setCurrentPage(prev => prev + 1);
  };

  const initialValues = {
    keyword: ""
  };

  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <MyUrlInput
            name="keyword"
            placeholder="keyword 를 입력하고 ENTER 키를 눌러주세요."
            ref={container}
          />
        </Form>
      </Formik>
      {totalImageNumber && sumitted ? (
        <>
          <NavBar>
            <NavButton onClick={clickPreviousHandler}>
              {currentPage !== 1 && "Previous"}
            </NavButton>

            <TotalNumber>{totalImageNumber} totals</TotalNumber>

            <NavButton onClick={clickNextHandler}>
              {currentPage !== totalPages && "Next"}
            </NavButton>
          </NavBar>
          <SplashSelect images={filterdResult} />
        </>
      ) : (
        sumitted &&
        totalImageNumber === 0 && (
          <Row.CenterCenter>검색결과가 없습니다.</Row.CenterCenter>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
  z-index: 3;
`;

const NavBar = styled(Row.CenterBetween)`
  z-index: 10;
  flex: 1;
`;

const NavButton = styled.div`
  width: 100px;
`;

const TotalNumber = styled.div``;
