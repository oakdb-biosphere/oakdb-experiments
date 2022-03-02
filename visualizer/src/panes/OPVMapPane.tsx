import { Heading } from "../components/Heading";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { opvMapAtom } from "../state";
import TdMono from "../components/TdMono";
import TextTooltip from "../components/TextTooltip";

export function OPVMapPane() {
  const [opvMap] = useAtom(opvMapAtom);

  return (
    <>
      <Heading size="md">
        OPV-Map
        <TextTooltip>Object-property-value map</TextTooltip>
      </Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>ObjectId</Th>
            <Th>Property</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {opvMap.map((item, index) => (
            <Row key={index} item={item} />
          ))}
        </Tbody>
      </Table>
    </>
  );
}

function Row({ item }): JSX.Element {
  const [key, value] = item;
  const [objectId, property] = key.split(":");
  return (
    <Tr>
      <TdMono>{objectId}</TdMono>
      <TdMono>{property}</TdMono>
      <TdMono>{value}</TdMono>
    </Tr>
  );
}
