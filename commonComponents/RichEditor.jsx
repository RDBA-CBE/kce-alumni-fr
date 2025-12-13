"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = (props) => {
  const { value, onChange, height, width } = props;
  const [editorContent, setEditorContent] = useState("");

  const handleChange = (val) => {
    setEditorContent(val);
    onChange(val); // Only call onChange here — on user input
  };

  useEffect(() => {
    if (value && value !== editorContent) {
      setEditorContent(value);
    }
  }, [value]);

  return (
    <ReactQuill
      value={editorContent}
      onChange={handleChange}
      theme="snow"
      style={{
        height: height ? height : "250px",
        width: width ? width : "100%",
        color: "black",
        
      }}
      modules={RichTextEditor.modules}
    />
  );
};

RichTextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
  ],
};

export default RichTextEditor;
