import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically load CKEditor and its Classic build on the client only.
const DynamicEditor = dynamic(
  async () => {
    const editorMod = await import('@ckeditor/ckeditor5-react');
    const classicMod = await import('@ckeditor/ckeditor5-build-classic');
    const CKEditor = editorMod.CKEditor;
    const ClassicEditor = classicMod.default || classicMod;
    return function EditorWrapper(props) {
      return (
        <CKEditor
          editor={ClassicEditor}
          {...props}
        />
      );
    };
  },
  { ssr: false },
);

export default function RichEditor(props) {
  return <DynamicEditor {...props} />;
}
