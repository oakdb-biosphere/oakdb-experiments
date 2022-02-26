import { Heading } from "../components/Heading";

export function DebugPane(props) {
  return (
    <>
      <Heading size="md">Debug</Heading>
      <pre style={{ fontSize: "11px" }}>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
