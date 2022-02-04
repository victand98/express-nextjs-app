import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "../components";

export const Page404 = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>

      <Text fontSize="18px" mt={3} mb={2}>
        Pagina no encontrada
      </Text>

      <Text color={"gray.500"} mb={6}>
        La página que busca no parece existir
      </Text>

      <Link href="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
        >
          Regresar
        </Button>
      </Link>
    </Box>
  );
};

export default Page404;
