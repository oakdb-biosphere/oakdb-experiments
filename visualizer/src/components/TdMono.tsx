import { Td } from "@chakra-ui/react";

export default function TdMono({ children }) {
  return (
    <Td pt={0} pb={0} fontSize={11} fontFamily={"monospace"}>
      {children}
    </Td>
  );
}
