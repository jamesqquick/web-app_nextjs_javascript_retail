import { EmailProvider } from "@/context/email-status-context";
import { ProfileProvider } from "@/context/profile-context";
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon mask-icon"
          href="https://images.ctfassets.net/23aumh6u8s0i/OhwxuwokEYVF8ghcJyyIx/f6e79a242e1aba89b02bb1306a7b057a/whatabyte-icon-light.svg"
          color="#000000"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="The WHATABYTE Store is a demo application that lets you see React user authentication in action using Auth0."
        />
        <title>WHATABYTE</title>
      </Head>
      <UserProvider>
        <ProfileProvider>
          <EmailProvider>
            <Component {...pageProps} />
          </EmailProvider>
        </ProfileProvider>
      </UserProvider>
    </>
  );
}

export default App;
