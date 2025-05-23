import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { ThemeProvider } from "~/components/theme-provider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
        { rel: "icon", href: "/favicon.ico" },
        { rel: "canonical", href: `https://offgridcollective.co/` },
      ],
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const isDevelopment = process.env.NODE_ENV === "development";
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Script to avoid theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = "ui-theme";
                  const theme = localStorage.getItem(storageKey);
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
                    ? "dark" 
                    : "light";
                  
                  document.documentElement.classList.remove("light", "dark");
                  document.documentElement.classList.add(theme === "system" ? systemTheme : theme || systemTheme);
                } catch (e) {
                  console.error("Theme initialization failed:", e);
                }
              })();
            `,
          }}
        />
        {!isDevelopment && (
          <>
            <meta
              name="google-site-verification"
              content="TT6Q0Nw9rcPnAj7v0eSZ38s6IPDZigFvz5m9Owzuq-M"
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-2YSE678JXW"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2YSE678JXW');`,
              }}
            ></script>

            <script
              dangerouslySetInnerHTML={{
                __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NDVBWKTC');
  `,
              }}
            ></script>
          </>
        )}
      </head>
      <body
        className="relative min-h-screen bg-background font-sans antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        {children}

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
        {!isDevelopment && (
          <>
            <SpeedInsights />
            <Analytics mode="production" />
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-NDVBWKTC"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
          </>
        )}
      </body>
    </html>
    </ClerkProvider>

  );
}
