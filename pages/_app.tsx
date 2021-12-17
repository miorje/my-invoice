import "../styles/globals.css";
import { AppProps } from "next/app";
import { StoreProvider } from "easy-peasy";
import { store } from "../src/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
