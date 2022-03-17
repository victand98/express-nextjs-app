import React from "react";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

const DefaultLayout = ({ children }) => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("green.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {children}
      </Stack>
    </Flex>
  );
};

export default DefaultLayout;
