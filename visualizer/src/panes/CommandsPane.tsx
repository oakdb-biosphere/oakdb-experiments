import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { FiLogIn, FiArrowLeft, FiInfo } from "react-icons/fi";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";

import { demo } from "../demo";

export function Help({ mdPromise }) {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    mdPromise.then(({ html }) => setHtml(html));
  }, [mdPromise]);

  return (
    <Box p={8} className={"markdown-body"}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Box>
  );
}

export function Group({ title, examples, onInsert, onSelectInfo }) {
  return (
    <div>
      <Heading size="sm">{title}</Heading>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Example</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {examples.map((item, index) => (
            <Tr key={index}>
              <Td style={{ width: "100%" }}>
                <code className={"codeSnippet"}>{item.code}</code>
              </Td>
              <Td>
                <ButtonGroup isAttached spacing={0} size="sm" variant="solid">
                  <Button
                    leftIcon={<FiLogIn />}
                    size="sm"
                    title="Insert snippet into query editor"
                    onClick={() => onInsert(item)}
                  />
                  <Button
                    leftIcon={<FiInfo />}
                    size="sm"
                    title="More info about this command"
                    onClick={() => onSelectInfo(item)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export function CommandsPane({ onInsertCode }) {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const onClickInsert = ({ code }) => {
    onInsertCode(code);
    setSelectedInfo(null);
  };

  const onClickInfo = (item) => {
    setSelectedInfo(item);
  };

  if (selectedInfo) {
    return (
      <>
        <Button
          leftIcon={<FiArrowLeft />}
          onClick={() => setSelectedInfo(null)}
          width={"100%"}>
          GoBack
        </Button>
        <Help mdPromise={selectedInfo.docs} />
      </>
    );
  }

  return (
    <>
      <Heading size="md">Available Commands</Heading>
      {demo.map(({ title, examples }) => (
        <Group
          key={title}
          title={title}
          examples={examples}
          onInsert={onClickInsert}
          onSelectInfo={onClickInfo}
        />
      ))}
    </>
  );
}
