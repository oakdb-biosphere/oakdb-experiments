import { Button, Tooltip } from "@chakra-ui/react";
import { FiInfo } from "react-icons/fi";

export default function TextTooltip({ children }) {
  const tooltip = <span>{children}</span>;
  return (
    <Tooltip label={tooltip} fontSize="md">
      <Button variant="link" position="relative" display="inline" pl={2}>
        <FiInfo />
      </Button>
    </Tooltip>
  );
}
