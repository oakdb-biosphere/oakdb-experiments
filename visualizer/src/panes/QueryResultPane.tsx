import { Heading } from "../components/Heading";
import { useAtom } from "jotai";
import { queryResultAtom } from "../state";

export function QueryResultPane() {
  const [result] = useAtom(queryResultAtom);

  return (
    <>
      <Heading size="md">Query Result</Heading>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}
