import { Handbag, X } from 'phosphor-react'
import { useState } from 'react'
import { MenuBar, ItemsContainer, AmountItems, PriceItems, ImageContainer, ProductContainer } from './styles'
import Image from "next/legacy/image"

import teste from '../../assets/teste.png'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false)

    const handleOptionMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <nav>
            {
                (!openMenu) ? (
                    <div onClick={handleOptionMenu}>
                        <Handbag size={24} color='#8D8D99' />
                    </div>
                ) : (
                    <MenuBar onClick={handleOptionMenu}>
                        <X size={24} color='#8D8D99' />
                        <ItemsContainer>
                            <h1>Sacola de compras</h1>
                            <ProductContainer>
                                <ImageContainer>
                                    <Image src={teste} width={94} height={94} alt="" />
                                </ImageContainer>
                                <div>
                                    <p>Camiseta Beyond the Limits</p>
                                    <strong>R$ 79,90</strong>
                                    <span>Remover</span>
                                </div>
                            </ProductContainer>
                            <ProductContainer>
                                <ImageContainer>
                                    <Image src={teste} width={94} height={94} alt="" />
                                </ImageContainer>
                                <div>
                                    <p>Camiseta Beyond the Limits</p>
                                    <strong>R$ 79,90</strong>
                                    <span>Remover</span>
                                </div>
                            </ProductContainer>
                            <footer>
                                <AmountItems>
                                    <p>Quantidade</p>
                                    <p>3 itens</p>
                                </AmountItems>
                                <PriceItems>
                                    <p>Valor Total</p>
                                    <p>R$ 270,00</p>
                                </PriceItems>
                                <button>Finalizar compra</button>
                            </footer>
                        </ItemsContainer>
                    </MenuBar>
                )
            }
        </nav>
    )
}