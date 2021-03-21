import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { Row } from "components/Layout";
import { theme } from "theme";
import { useScrollToSubject } from "hooks";
import { selectors } from "data";

export default function SubjectBlock({ children }) {
  const key = children.key;
  const elementRef = useRef();
  const isReadOnly = useSelector(selectors.editorState.getIsReadOnly);

  useScrollToSubject({ elementRef: elementRef, currentId: key });

  return (
    <section id={key} ref={ref => (elementRef.current = ref)}>
      <Container>
        #
        {isReadOnly ? (
          <AnchorLink
            offset={10}
            href={`#${key}`}
            style={{ textDecoration: "none", color: theme["color-basic-900"] }}
            onClick={() =>
              window.history.pushState("", "block.text", `#${key}`)
            }
          >
            {children}
          </AnchorLink>
        ) : (
          <div>{children}</div>
        )}
      </Container>
    </section>
  );
}

const Container = styled(Row.Default)`
  font-size: 30px;
  font-weight: 500;
  color: ${theme["color-basic-900"]};
`;
