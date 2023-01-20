import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/legacy/image"
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import Shirt from '../assets/shirt.png'
import { stripe } from "@/lib/stripe"
import { GetServerSideProps } from "next"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number
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
    <HomeContainer ref={sliderRef} className="keen-slider">
      {
        products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image src={product.imageUrl} width={480} height={520} alt="" />
              <footer>
                <span>{product.name}</span>
                <strong>R$ {product.price}</strong>
              </footer>
            </Product>
          )
        })
      }
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount
    }
  })

  return {
    props: {
      products
    }
  }
}