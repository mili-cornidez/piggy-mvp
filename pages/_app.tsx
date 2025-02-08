import type { AppProps } from "next/app";
import "@styles/styles.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import AppProvider from "../context";
import '../i18n';

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

function AuthHandler({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const { authenticated } = usePrivy();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            if (authenticated) {
                if (router.pathname === "/login") {
                    router.push("/home");
                }
            } else {
                if (router.pathname !== "/login") {
                    router.push("/login");
                }
            }
        }
    }, [authenticated, router, isClient]);

    if (!isClient) return null;

    return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
    if (!PRIVY_APP_ID) {
        console.error("PRIVY_APP_ID is missing");
        return null;
    }

    return (
        <PrivyProvider appId={PRIVY_APP_ID}>
            <AppProvider>
                <AuthHandler>
                    <Component {...pageProps} />
                </AuthHandler>
            </AppProvider>
        </PrivyProvider>
    );
}
