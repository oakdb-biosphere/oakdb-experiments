import { Heading } from "../components/Heading";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { opvMapAtom } from "../state";

export function OPVMapPane() {
  const [opvMap] = useAtom(opvMapAtom);

  return (
    <>
      <Heading size="md">OPV-Map</Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {opvMap.map((item, index) => (
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
