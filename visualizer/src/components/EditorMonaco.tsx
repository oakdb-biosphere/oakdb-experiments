import { useRef, useEffect } from "react";
import { default as JsonEditor } from "@monaco-editor/react";

const options = {
  fontSize: 16,
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: "on",
  accessibilitySupport: "auto",
  autoIndent: true,
  automaticLayout: true,
  codeLens: false,
  colorDecorators: true,
  contextmenu: true,
  cursorBlinking: "blink",
  cursorSmoothCaretAnimation: false,
  cursorStyle: "line",
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
  dragAndDrop: false,
  fixedOverflowWidgets: false,
  folding: true,
  foldingStrategy: "auto",
  fontLigatures: false,
  formatOnPaste: true,
  formatOnType: true,
  hideCursorInOverviewRuler: false,
  highlightActiveIndentGuide: true,
  links: true,
  mouseWheelZoom: false,
  multiCursorMergeOverlapping: true,
  multiCursorModifier: "alt",
  overviewRulerBorder: true,
  overviewRulerLanes: 2,
  quickSuggestions: true,
  quickSuggestionsDelay: 20,
  readOnly: false,
  renderControlCharacters: false,
  renderFinalNewline: true,
  renderIndentGuides: true,
  renderLineHighlight: "all",
  renderWhitespace: "none",
  revealHorizontalRightPadding: 30,
  roundedSelection: true,
  rulers: [],
  scrollBeyondLastColumn: 5,
  scrollBeyondLastLine: true,
  selectOnLineNumbers: true,
  selectionClipboard: true,
  selectionHighlight: true,
  showFoldingControls: "mouseover",
  smoothScrolling: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: true,
  wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
  wordWrap: "off",
  wordWrapBreakAfterCharacters: "\t})]?|&,;",
  wordWrapBreakBeforeCharacters: "{([+",
  wordWrapBreakObtrusiveCharacters: ".",
  wordWrapColumn: 80,
  wordWrapMinified: true,
  wrappingIndent: "none",
  minimap: {
    enabled: false,
  },
};

function Editor({ ready, data, onChange, onValid, format }) {
  const editor = useRef(null);
  const defaultValue = data;

  const editorDidMount = (monacoEditor) => {
    editor.current = {
      format() {
        monacoEditor.getAction("editor.action.formatDocument").run();
      },
    };
  };

  function _onChange(data) {
    let isValid = true;
    try {
      const payload = data;
      onChange(payload);
    } catch (error) {
      isValid = false;
    }
    onValid(isValid);
  }

  useEffect(() => {
    editor?.current?.format();
  }, [format]);

  return (
    <div className="editor">
      {ready && (
        <JsonEditor
          defaultValue={defaultValue}
          onChange={_onChange}
          defaultLanguage="javascript"
          theme="vs-dark"
          onMount={editorDidMount}
          options={options}
          path={"default.json"}
        />
      )}
    </div>
  );
}

export default Editor;
