import { Handbag, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { MenuBar, ItemsContainer, AmountItems, PriceItems, ImageContainer, ProductContainer, AmountShirts } from './styles'
import Image from "next/legacy/image"

import teste2 from '../../assets/teste.png'
import { BagContext } from '@/context'
import axios from 'axios'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false)
    const { amountShirts, setAmountShirts, cartItems } = useContext(BagContext)

    const handleOptionMenu = () => {
        setOpenMenu(!openMenu)
    }

    async function handleBuyProduct() {
        setAmountShirts(0)
        try {
            const response = await axios.post('/api/checkout', {
                products: cartItems
            })
            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <nav>
            {
                (!openMenu) ? (
                    <section style={{ marginBottom: '1.25rem' }}>
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
                            {
                                cartItems.map((shirt) => (
                                    <ProductContainer key={shirt.id}>
                                        <ImageContainer>
                                            <Image src={shirt.imageUrl} width={94} height={94} alt="" />
                                        </ImageContainer>
                                        <div>
                                            <p>{shirt.name}</p>
                                            <strong>{shirt.price}</strong>
                                            <span>Remover</span>
                                        </div>
                                    </ProductContainer>
                                ))
                            }
                            <footer>
                                <AmountItems>
                                    <p>Quantidade</p>
                                    <p>{amountShirts} itens</p>
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