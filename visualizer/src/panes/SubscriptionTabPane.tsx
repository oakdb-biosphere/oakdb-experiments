import { Heading } from "../components/Heading";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { subTabAtom } from "../state";
import TdMono from "../components/TdMono";
import TextTooltip from "../components/TextTooltip";

export function SubscriptionTabPane() {
  const [subTab] = useAtom(subTabAtom);

  return (
    <>
      <Heading size="md">
        Subscription Table
        <TextTooltip>Subscription Table</TextTooltip>
      </Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {subTab.map((item, index) => (
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
