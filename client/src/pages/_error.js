import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "../components";

function Error({ statusCode, message }) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        {statusCode}
      </Heading>

      {typeof message === "string" ? (
        <Text fontSize="18px" mt={3} mb={2}>
          {message}
        </Text>
      ) : (
        message.map((item, key) => (
          <Text fontSize="18px" mt={3} mb={2} key={key}>
            {item.message}
          </Text>
        ))
      )}

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
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = err.response
    ? err.response.status
    : res
    ? res.statusCode
    : 404;

  const message = err.response ? err.response.data.errors : err.message;

  return { statusCode, message };
};

export default Error;
