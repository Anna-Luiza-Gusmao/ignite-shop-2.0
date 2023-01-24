import { Handbag, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { MenuBar, ItemsContainer, AmountItems, PriceItems, ImageContainer, ProductContainer, AmountShirts } from './styles'
import Image from "next/legacy/image"

import teste2 from '../../assets/teste.png'
import { BagContext } from '@/context'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false)
    const { amountShirts, setAmountShirts } = useContext(BagContext)

    const handleOptionMenu = () => {
        setOpenMenu(!openMenu)
    }

    async function handleBuyProduct() {
        setAmountShirts(0)
        try {

            window.location.href = ''
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datalog / Sentry)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <nav>
            {
                (!openMenu) ? (
                    <section style={{marginBottom: '1.25rem'}}>
                        <AmountShirts>{amountShirts}</AmountShirts>
                        <div onClick={handleOptionMenu}>
                            <Handbag size={24} color='#8D8D99' />
                        </div>
                    </section>
                ) : (
                    <MenuBar onClick={handleOptionMenu}>
                        <X size={24} color='#8D8D99' />
                        <ItemsContainer>
                            <h1>Sacola de compras</h1>
                            <ProductContainer>
                                <ImageContainer>
                                    <Image src={teste2} width={94} height={94} alt="" />
                                </ImageContainer>
                                <div>
                                    <p>Camiseta Beyond the Limits</p>
                                    <strong>R$ 79,90</strong>
                                    <span>Remover</span>
                                </div>
                            </ProductContainer>
                            <ProductContainer>
                                <ImageContainer>
                                    <Image src={teste2} width={94} height={94} alt="" />
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
                                    <p>1 itens</p>
                                </AmountItems>
                                <PriceItems>
                                    <p>Valor Total</p>
                                    <p>R$ 270,00</p>
                                </PriceItems>
                                <button onClick={handleBuyProduct}>Finalizar compra</button>
                            </footer>
                        </ItemsContainer>
                    </MenuBar>
                )
            }
        </nav>
    )
}