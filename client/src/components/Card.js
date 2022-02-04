import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

export const Card = (props) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    rounded={{ md: "lg" }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
);

export const CardHeader = (props) => {
  const { title, action } = props;
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Heading fontSize="lg">{title}</Heading>
      {action}
    </Flex>
  );
};

export const CardBody = (props) => <Box px="6" py="4" {...props} />;
