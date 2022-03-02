import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { FiLogIn, FiArrowLeft } from "react-icons/fi";
import {
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  ButtonGroup,
  Box,
  Tooltip,
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

function mapMultiLineCode(code) {
  return code.split("\n").map((line) => (
    <code className={"codeSnippet"} key={line}>
      {line}
      <br />
      <br />
    </code>
  ));
}

export function Group({ title, examples, onInsert, onSelectInfo }) {
  return (
    <div>
      <Heading size="sm" spacing={4}>
        {title}
      </Heading>
      <Table variant="striped" size="sm">
        <Tbody>
          {examples.map((item, index) => (
            <Tr key={index} opacity={item.final ? 1.0 : 0.5}>
              <Td style={{ width: "100%" }}>
                <Button
                  variant="link"
                  fontWeight={500}
                  onClick={() => onSelectInfo(item)}>
                  {item.title ? (
                    item.title
                  ) : (
                    <code>{item.code.substring(0, 32)}...</code>
                  )}
                </Button>
              </Td>
              <Td>
                <ButtonGroup isAttached spacing={0} size="sm" variant="solid">
                  {item.code && (
                    <Tooltip
                      label={
                        <div>
                          <span>Insert snippet into query editor:</span>
                          <br />
                          <br />
                          {mapMultiLineCode(item.code)}
                        </div>
                      }>
                      <Button
                        leftIcon={<FiLogIn />}
                        size="sm"
                        onClick={() => onInsert(item)}
                      />
                    </Tooltip>
                  )}
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
    <Box>
      <Heading size="md" spacing={4}>
        Available Commands
      </Heading>
      <Box mb={12}>
        {demo.map(({ title, examples }) => (
          <Group
            key={title}
            title={title}
            examples={examples}
            onInsert={onClickInsert}
            onSelectInfo={onClickInfo}
          />
        ))}
      </Box>
    </Box>
  );
}
