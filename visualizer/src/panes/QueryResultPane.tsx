import { Heading } from "../components/Heading";
import { useAtom } from "jotai";
import { queryResultAtom } from "../state";
import { Box } from "@chakra-ui/react";

export function QueryResultPane() {
  const [result] = useAtom(queryResultAtom);

  return (
    <>
      <Heading size="md">Query Result</Heading>
      <Box
        background={"rgb(39, 40, 34)"}
        color={"white"}
        minHeight={"100%"}
        fontSize={14}
        p={2}>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </Box>
    </>
  );
}
