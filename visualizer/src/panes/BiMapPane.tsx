import { useAtom } from "jotai";
import { biMapAtom } from "../state";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { Heading } from "../components/Heading";
import TdMono from "../components/TdMono";
import TextTooltip from "../components/TextTooltip";

export function BiMapPane() {
  const [biMap] = useAtom(biMapAtom);

  return (
    <>
      <Heading size="md">
        Bi-Map
        <TextTooltip>Bijective path-to-id map</TextTooltip>
      </Heading>
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
              <TdMono>{item[0]}</TdMono>
              <TdMono>{item[1]}</TdMono>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
