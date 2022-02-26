import { useAtom } from "jotai";
import { biMapAtom } from "../state";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Heading } from "../components/Heading";

export function BiMapPane() {
  const [biMap] = useAtom(biMapAtom);

  return (
    <>
      <Heading size="md">Bi-Map</Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {biMap.map((item, index) => (
            <Tr key={index}>
              <Td>{item[0]}</Td>
              <Td>{item[1]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
