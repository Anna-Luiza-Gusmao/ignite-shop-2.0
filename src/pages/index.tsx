import { HomeContainer, Product } from "@/styles/pages/home"
import Head from "next/head"
import Image from "next/legacy/image"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {
          products.map((product) => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={480} height={520} alt="" />
                  <footer>
                    <span>{product.name}</span>
                    <strong>{product.price}</strong>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    let formattedPrice = ''

    if (price.unit_amount != null) {
      formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formattedPrice
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}