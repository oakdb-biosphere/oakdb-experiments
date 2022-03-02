import { Heading as HeadingChakra, HeadingProps } from "@chakra-ui/react";

interface IHeading {
  size?: HeadingProps["size"];
  textAlign?: HeadingProps["textAlign"];
  spacing?: number;
  children?: React.ReactNode;
}

export function Heading({
  size = "md",
  textAlign = "center",
  spacing = 1,
  children,
}: IHeading) {
  return (
    <HeadingChakra
      size={size}
      textAlign={textAlign}
      pb={spacing}
      pt={spacing}
      color={"gray.600"}
      backgroundColor={"gray.50"}
      borderColor={"gray.100"}
      borderBottomWidth={1}>
      {children}
    </HeadingChakra>
  );
}
