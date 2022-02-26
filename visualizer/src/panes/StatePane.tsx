import { Heading } from "../components/Heading";
import { useAtom } from "jotai";
import { stateAtom } from "../state";
import ReactJson from "react-json-view";

export function StatePane() {
  const [state] = useAtom(stateAtom);

  return (
    <>
      <Heading size="md">State</Heading>
      <ReactJson src={state} theme={"monokai"} style={{ height: "100%" }} />
    </>
  );
}
