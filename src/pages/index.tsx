import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/legacy/image"

import Shirt from '../assets/shirt.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={Shirt} width={480} height={520} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={Shirt} width={480} height={520} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}