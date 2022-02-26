import { Heading } from "../components/Heading";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FiTrash2, FiXOctagon } from "react-icons/fi";
import { useAtom } from "jotai";
import { opLogAtom } from "../state";
import { dispatchCmd as onSendCmd } from "../state";

export function OpLogPane() {
  const [opLog, setOpLog] = useAtom(opLogAtom);

  const onResetDb = async () => {
    await onSendCmd({ op: "clear" });
    console.clear();
  };

  const onClear = async () => {
    setOpLog([]);
  };

  return (
    <>
      <div className="addressBar">
        <ButtonGroup>
          <Button onClick={onResetDb} leftIcon={<FiTrash2 />}>
            Reset DB
          </Button>
          <Button onClick={onClear} leftIcon={<FiXOctagon />}>
            Clear Log
          </Button>
        </ButtonGroup>
      </div>
      <Heading size="md">OpLog</Heading>
      <pre style={{ fontSize: "12px" }}>
        {opLog.map((op, index) =>
          typeof op === "string" ? (
            <code key={index}>- {op}</code>
          ) : (
            <code key={index} style={{ fontWeight: "bold" }}>
              {JSON.stringify(op)}
            </code>
          ),
        )}
      </pre>
    </>
  );
}
