import React from "react";
import styled from "styled-components";

export default function InlineStyleController({
  editorState,
  setEditorState,
  handleKeyCommand
}) {
  const ControlButton = ({ label, style, editorState, setEditorState }) => {
    let className = "RichEditor-ControlButton";
    return (
      <span
        className={className}
        onMouseDown={() => handleKeyCommand(editorState, setEditorState)(style)}
      >
        {label}
      </span>
    );
  };

  return (
    <StyledEditorControl>
      {INLINE_STYLES.map(type => (
        <ControlButton
          key={type.label}
          label={type.label}
          style={type.style}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      ))}
    </StyledEditorControl>
  );
}

const INLINE_STYLES = [
  { label: "Bold", style: "bold" },
  { label: "Italic", style: "italic" },
  { label: "Underline", style: "underline" },
  { label: "Monospace", style: "code" }
];

const StyledEditorControl = styled.div`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
  .RichEditor-ControlButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
  }
`;
