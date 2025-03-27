import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import type { QueryClient } from '@tanstack/react-query'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { ThemeProvider } from '~/components/theme-provider'
import { RootLayout } from '~/layouts/RootLayout'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => {
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
        { rel: 'icon', href: '/favicon.ico' },
        {rel: 'canonical', href: `https://offgridcollective.co/`}
      ],
    }
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <RootDocument>
        <RootLayout />
      </RootDocument>
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
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
        <meta name="google-site-verification" content="TT6Q0Nw9rcPnAj7v0eSZ38s6IPDZigFvz5m9Owzuq-M" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2YSE678JXW"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2YSE678JXW');`
        }}></script>
      </head>
      <body className="relative min-h-screen bg-background font-sans antialiased transition-colors duration-300" suppressHydrationWarning>
        {children}
        
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
        <SpeedInsights />
        <Analytics mode="production" />

      </body>
    </html>
  )
}
