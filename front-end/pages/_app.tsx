import "@styles/globals.css";
import { appWithTranslation, AppWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
}


export default appWithTranslation(App);