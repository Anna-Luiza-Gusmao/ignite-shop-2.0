import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { Container, Header, HeaderSuccess } from '@/styles/pages/app'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import NavBar from '@/components/NavBar'
import { BagContextProvider } from '@/context'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <BagContextProvider>
      <Container>
        {
          (router.pathname === '/success') ? (
            <HeaderSuccess>
              <Image src={Logo} alt="" />
            </HeaderSuccess>
          ) : (
            <Header>
              <Image src={Logo} alt="" />
              <NavBar />
            </Header>
          )
        }
        <Component {...pageProps} />
      </Container>
    </BagContextProvider>
  )
} 