import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FiPlay, FiEye, FiEyeOff, FiSave, FiAlignLeft } from "react-icons/fi";
import EditorMonaco from "../components/EditorMonaco";
import { editorTextAtom, queryResultAtom } from "../state";
import { CommandsPane } from "./CommandsPane";
import { dispatchCmd as onSendCmd } from "../state";

export function EditorPane({ isReady: _isReady }) {
  const [isReady, setIsReady] = useState(_isReady);
  const [data, setData] = useAtom(editorTextAtom);
  const [previousQueryResult] = useAtom<{ id?: string }>(queryResultAtom);
  const [formatCounter, setFormatCounter] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [showCommands, setShowCommands] = useState(false);

  useEffect(() => {
    const text = window.localStorage.getItem("oak.editor");
    if (text) {
      setData(text);
    }
    setIsReady(true);
  }, []);

  const onChange = (newData) => {
    setIsDirty(true);
    setData(newData);
  };

  const onSaveToFile = () => {
    window.localStorage.setItem("oak.editor", data);
    setIsDirty(false);
  };

  const onInsertCode = (code) => {
    setShowCommands(false);
    const addComment = (s) => (s.startsWith(`//`) ? s : `// ${s}`);
    const replaceUUID = (s) =>
      s.replaceAll("<uuid>", previousQueryResult?.id ?? "<uuid>");
    setData((data = "") =>
      [...data.split("\n").map(addComment), replaceUUID(code)].join("\n"),
    );
  };

  const onRun = async () => {
    for (const cmdText of data.split("\n")) {
      if (!cmdText.trim() || cmdText.trim().startsWith("//")) {
        continue;
      }
      const cmd = eval(`(() => (${cmdText}))()`);
      await onSendCmd(cmd);
    }
  };

  return (
    <>
      <div className="addressBar">
        <ButtonGroup>
          <Button
            onClick={onRun}
            leftIcon={<FiPlay />}
            disabled={!isValid}
            colorScheme="orange">
            Run
          </Button>
          <Button
            onClick={() => setFormatCounter((x) => x + 1)}
            leftIcon={<FiAlignLeft />}>
            Format
          </Button>
          <Button onClick={onSaveToFile} leftIcon={<FiSave />}>
            Save {isDirty ? "*" : ""}
          </Button>
          <Button
            onClick={() => setShowCommands((v) => !v)}
            leftIcon={showCommands ? <FiEyeOff /> : <FiEye />}>
            {showCommands ? "Hide Commands" : "Show Commands"}
          </Button>
        </ButtonGroup>
      </div>
      {showCommands ? (
        <div style={{ overflow: "scroll", height: "100%" }}>
          <CommandsPane onInsertCode={onInsertCode} />
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <EditorMonaco
            data={data}
            onChange={onChange}
            onValid={setIsValid}
            ready={isReady}
            format={formatCounter}
          />
        </div>
      )}
    </>
  );
}
