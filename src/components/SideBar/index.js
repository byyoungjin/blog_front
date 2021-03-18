import React from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

import { mapping, theme } from "theme";
import { Col } from "components/Layout";
import { Tag } from "components";
import { useTags } from "hooks";

import MainLogo from "../MainLogo";

export default function SideBar() {
  const { tags } = useTags();

  return (
    <Container>
      <FiMenu
        style={{
          width: 30,
          height: 30,
          color: theme["color-basic-900"],
          cursor: "pointer"
        }}
      />

      <MainLogo />
      <Tag.Group
        tags={tags}
        direction="column"
        isSelectable={true}
        style={{ alignItems: "center" }}
      />
    </Container>
  );
}

const Container = styled(Col.Default)`
  background-color: ${theme["color-basic-200"]};
  margin-left: 10px;
  width: 80%;
  height: 80vh;
  border-radius: 8px;
  padding: 10px 20px;
`;
