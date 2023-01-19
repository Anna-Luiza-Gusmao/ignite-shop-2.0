import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/legacy/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={Logo} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
} 