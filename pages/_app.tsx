import * as React from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { EmotionCache } from '@emotion/react'
import theme from '../components/Theme'
import MainLayout from '../components/Layout'
import { StateProvider } from '../contexts/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as auth from '../services/auth';

// Client-side cache, shared for the whole session of the user in the browser.

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    auth.init()
    setIsLoading(true)
  }, [])
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
          {isLoading &&
              <MainLayout>
                  <Component {...pageProps} />
                  <ToastContainer
                      position="bottom-right"
                      autoClose={400}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                  />
              </MainLayout>
          }
        </StateProvider>
      </ThemeProvider>
    </>
  )
}
