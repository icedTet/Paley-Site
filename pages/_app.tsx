import React, { useEffect } from "react";
import { AppProps } from "next/app";

import "../styles/index.css";
import "../styles/globals.css";
import { QuickSettings } from "../components/Admin/QuickSettings/QuickSettings";
import "../utils/nprogress";
import "nprogress/nprogress.css";
import { configureColor } from "../utils/nprogress";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => configureColor(`rgb(225 29 72)`), []);
  return (
    <>
      <Component {...pageProps} />
      <QuickSettings />
    </>
  );
}
export default MyApp;
