import React from "react";
import {
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { DefaultLayout } from "../layouts";
import { LoginForm } from "../components";

const Login = () => {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"4xl"}>Administracion OLT ZTE</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        Ingresa tus credenciales
      </Text>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("gray.200")}
        boxShadow={"lg"}
        p={8}
      >
        <LoginForm />
      </Box>
    </Stack>
  );
};

Login.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
