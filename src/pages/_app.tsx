import type { AppProps } from 'next/app'
import React from 'react'
import Head from "next/head";
import 'tailwindcss/tailwind.css'
import MainMenu from '../components/MainMenu';
import { NewFishContextProvider } from '../contexts/NewFishContext';
import Image from 'next/image'
import icon from '../../public/favicon-white.svg'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <MainMenu />
      <div className="h-max min-h-screen w-full bg-primary-bg pt-16 pb-16">
        <NewFishContextProvider>
          <Component {...pageProps} />
        </NewFishContextProvider>
      </div>
      <div className='fixed flex bottom-0 w-full h-8 bg-primary-dark justify-center'>
        <Image width="40px" height="40px" src={icon} alt="Atlantis" />
      </div>
    </>
  )
}

export default MyApp
