import { CartContextProvider } from "@/contexts/CartContext";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import axios from "axios";
import https from "https";

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  config.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  return config;
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
