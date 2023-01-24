import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import Logo from '../assets/logo.svg'
import { Container, Header, HeaderSuccess } from '@/styles/pages/app'
import Image from 'next/legacy/image'
import { Handbag } from 'phosphor-react'
import { useRouter } from 'next/router'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname)

  return (
    <Container>
      {
        (router.pathname === '/success') ? (
          <HeaderSuccess>
            <Image src={Logo} alt="" />
          </HeaderSuccess>
        ) : (
          <Header>
            <Image src={Logo} alt="" />
            <div>
              <Handbag size={24} color='#8D8D99' />
            </div>
          </Header>
        )
      }
      <Component {...pageProps} />
    </Container>
  )
} 