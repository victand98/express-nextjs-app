import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import buildClient from "../lib/api/buildClient";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps, currentUser }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthContextProvider currentUser={currentUser}>
      <ChakraProvider>
        {getLayout(<Component currentUser={currentUser} {...pageProps} />)}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/auth/current/user");

  let pageProps = {};
  if (appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
