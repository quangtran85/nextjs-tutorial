import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../components/Theme'
import MainLayout from '../components/Layout'
import { StateProvider } from '../contexts/AppContext'

// Client-side cache, shared for the whole session of the user in the browser.

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <StateProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </StateProvider>
      </ThemeProvider>
    </>
  )
}
