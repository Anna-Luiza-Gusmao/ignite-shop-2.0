import { Handbag, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { MenuBar, ItemsContainer, AmountItems, PriceItems, ImageContainer, ProductContainer, AmountShirts, EmptyBagContainer } from './styles'
import Image from "next/legacy/image"

import { BagContext } from '@/context'
import axios from 'axios'
import produce from 'immer'

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false)
    const { 
        amountShirts, 
        cartItems, 
        setSumOfShirtsPrice, 
        sumOfShirtsPrice, 
        emptyBag, 
        setCartItems, 
        setAmountShirts 
    } = useContext(BagContext)

    function calculateTotalItems() {
        let totalPriceShirts = 0

        cartItems.forEach(shirt => {
            totalPriceShirts += parseFloat(shirt.price)
        })

        return totalPriceShirts
    }
    setSumOfShirtsPrice(calculateTotalItems())

    async function handleBuyProduct() {
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

    const handleOptionMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handleRemoveProduct = (productId: string) => {
        const productAlreadyExists = cartItems.findIndex((cartItem) => cartItem.id === productId)

        const newCart = produce(cartItems, (draft) => {
            if (productAlreadyExists >= 0) {
                draft.splice(productAlreadyExists, 1)
            }
        })

        setCartItems(newCart)
        setAmountShirts(amountShirts - 1)
        if (typeof window !== 'undefined') { 
            const stateAmountShirt = JSON.stringify(amountShirts - 1)
            localStorage.setItem('@ignite-shop-2.0: amountShirts-state-1.0.0', stateAmountShirt)
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
                                (emptyBag) ? (
                                    <EmptyBagContainer>
                                        <Handbag size={42} color='#8D8D99' />
                                        <p>A sua sacola ainda está vazia :(</p>
                                    </EmptyBagContainer>
                                ) :
                                (
                                    cartItems.map((shirt) => (
                                        <ProductContainer key={shirt.id}>
                                            <ImageContainer>
                                                <Image src={shirt.imageUrl} width={94} height={94} alt="" />
                                            </ImageContainer>
                                            <div>
                                                <p>{shirt.name}</p>
                                                <strong>R$ {parseFloat(shirt.price).toFixed(2).replace(".", ",")}</strong>
                                                <span onClick={() => handleRemoveProduct(shirt.id)}>Remover</span>
                                            </div>
                                        </ProductContainer>
                                    ))
                                )
                            }
                            <footer>
                                <AmountItems>
                                    <p>Quantidade</p>
                                    <p>{amountShirts} itens</p>
                                </AmountItems>
                                <PriceItems>
                                    <p>Valor Total</p>
                                    <p>R$ {sumOfShirtsPrice.toFixed(2).replace(".", ",")}</p>
                                </PriceItems>
                                <button onClick={handleBuyProduct} disabled={emptyBag}>Finalizar compra</button>
                            </footer>
                        </ItemsContainer>
                    </MenuBar>
                )
            }
        </nav>
    )
}