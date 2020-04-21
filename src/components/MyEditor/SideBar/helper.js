import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";
import api from "api";

export const addMedia = ({ editorState, src, type }) => {
  if (!src) {
    return;
  }
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, "IMMUTABLE", {
    src
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );
  return newState;
};

export const fileSelectHandler = (editorState, onChange, e) => {
  const selectedFile = e.target.files[0];
  const reader = new FileReader();

  reader.onload = async e => {
    const fileInfo = {
      fileName: selectedFile.name,
      fileType: selectedFile.type
    };
    const res = await api.awsApi.signS3(fileInfo);
    const { signedRequest, url } = res.data.data;
    const options = {
      headers: {
        "Content-Type": fileInfo.fileType
      }
    };
    const uploadInfo = {
      signedRequest,
      file: selectedFile,
      options
    };
    const resUpload = await api.awsApi.uploadImage(uploadInfo);

    onChange(addMedia({ type: "image", src: url, editorState }));

    console.log("resUpload", resUpload);
  };

  reader.readAsDataURL(selectedFile);
};
