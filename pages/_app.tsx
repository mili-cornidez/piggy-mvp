import type { AppProps } from "next/app";
import "@styles/styles.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
//import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import AppProvider from "../context";
import '../i18n';

function AuthHandler({ children }: { children: React.ReactNode }) {
    //const { authenticated } = usePrivy();
    const router = useRouter();

    /*
    useEffect(() => {
        if (authenticated) {
            if (router.pathname === "/login") {
                router.push("/home");
            }
        } else {
            if (router.pathname !== "/login") {
                router.push("/login");
            }
        }
    }, [authenticated, router]);
    */

    useEffect(() => {
        if (router.pathname === "/login") {
            router.push("/home");
        }
    }, [router]);

    return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        /*
        <PrivyProvider appId="cm513pd0700zp3etfiup208us">
            <AppProvider>
                <AuthHandler>
                    <Component {...pageProps} />
                </AuthHandler>
            </AppProvider>
        </PrivyProvider>
         */
        <AppProvider>
            <AuthHandler>
                <Component {...pageProps} />
            </AuthHandler>
        </AppProvider>
    );
}
