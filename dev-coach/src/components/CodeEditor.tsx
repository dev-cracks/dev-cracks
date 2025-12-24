import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import './CodeEditor.css';

export interface ProjectFile {
  filename: string;
  content: string;
}

interface CodeEditorProps {
  files: ProjectFile[];
  onFilesChange: (files: ProjectFile[]) => void;
  onSave?: () => void;
}

export const CodeEditor = ({ files, onFilesChange, onSave }: CodeEditorProps) => {
  const [activeFile, setActiveFile] = useState<string>(files[0]?.filename || 'index.html');
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Obtener el contenido del archivo activo
  const activeFileContent = files.find(f => f.filename === activeFile)?.content || '';

  // Manejar cambios en el editor
  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;

    const updatedFiles = files.map(file =>
      file.filename === activeFile ? { ...file, content: value } : file
    );
    onFilesChange(updatedFiles);
  };

  // Obtener el lenguaje según la extensión del archivo
  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'cs':
        return 'csharp';
      case 'json':
        return 'json';
      case 'xml':
        return 'xml';
      default:
        return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-tabs">
        {files.map((file) => (
          <button
            key={file.filename}
            className={`code-editor-tab ${activeFile === file.filename ? 'active' : ''}`}
            onClick={() => setActiveFile(file.filename)}
          >
            {file.filename}
          </button>
        ))}
      </div>
      <div className="code-editor-wrapper">
        <Editor
          height="100%"
          language={getLanguage(activeFile)}
          value={activeFileContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on'
          }}
        />
      </div>
      {onSave && (
        <div className="code-editor-actions">
          <button className="save-button" onClick={onSave}>
            Guardar Proyecto
          </button>
        </div>
      )}
    </div>
  );
};

