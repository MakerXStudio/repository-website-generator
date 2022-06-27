import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { configuration } from '../shared/configuration'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          {configuration.title} ({configuration.name})
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
