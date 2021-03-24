import React from "react";
import styled from "styled-components";

import { theme } from "theme";
import { Col } from "components/Layout";
import { Tag } from "components";
import { useTags } from "hooks";

export default function SideBar() {
  const { tags, currentTagName, updateCurrentTag } = useTags();
  return (
    <Container>
      <div style={{ marginBottom: 20, fontSize: 24 }}>Tags</div>
      <Tag.Group
        tags={tags}
        direction="column"
        isSelectable={true}
        style={{ alignItems: "flex-start" }}
        currentTagName={currentTagName}
        updateCurrentTag={updateCurrentTag}
      />
    </Container>
  );
}

const Container = styled(Col.Default)`
  background-color: ${theme["color-basic-200"]};
  margin-left: 10px;

  height: 80vh;
  border-radius: 8px;
  padding: 3px 5px;
`;
