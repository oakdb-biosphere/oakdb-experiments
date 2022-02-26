import { Heading as HeadingChakra } from "@chakra-ui/react";

interface IHeading {
  size?: string;
  children?: React.ReactNode;
}

export function Heading({ size, children }: IHeading) {
  return (
    <HeadingChakra
      size={size}
      textAlign="center"
      pb={1}
      pt={1}
      color={"gray.600"}
      backgroundColor={"gray.50"}
      borderColor={"gray.100"}
      borderBottomWidth={1}>
      {children}
    </HeadingChakra>
  );
}
