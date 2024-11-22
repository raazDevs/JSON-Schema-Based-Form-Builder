import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor, { OnMount, Monaco } from "@monaco-editor/react";
import { isValidJSON } from '../utils/jsonValidator';

interface JSONEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

export function JSONEditor({ initialValue, onChange, isDarkMode }: JSONEditorProps) {
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<Monaco | null>(null);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      if (value.trim() === '' || isValidJSON(value)) {
        setError(null);
        onChange(value);
      } else {
        setError("Invalid JSON");
        onChange('');
      }
    }
  }, [onChange]);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidPaste(() => {
      const value = editor.getValue();
      handleEditorChange(value);
    });
  };

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const disposable = editor.onKeyUp(() => {
        const value = editor.getValue();
        handleEditorChange(value);
      });

      return () => disposable.dispose();
    }
  }, [handleEditorChange]);

  return (
    <div className="w-full h-[400px] relative">
      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={initialValue}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          formatOnPaste: true,
          formatOnType: true,
          theme: isDarkMode ? 'vs-dark' : 'light',
        }}
        className={isDarkMode ? 'dark-editor' : 'light-editor'}
      />
      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white p-2">
          {error}
        </div>
      )}
    </div>
  );
}

