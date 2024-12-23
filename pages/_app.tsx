import type { AppProps } from "next/app";
import "@styles/styles.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppProvider from "../context";
import '../i18n';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (router.pathname === "/login") {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [router.pathname]);
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
