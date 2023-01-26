import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import SkeletonScreen from "./components/SkeletonScreen"
import { useContext, useEffect, useState } from "react"
import { BagContext, IProduct } from "@/context"
import produce from "immer"

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
    }
}

const BaseDataShirtSelected = [
    {
        id: '',
        name: '',
        imageUrl: '',
        price: '',
        description: '',
        defaultPriceId: ''
    }
]

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()
    if (isFallback) return <SkeletonScreen />

    const { 
        amountShirts, 
        setAmountShirts, 
        setCartItems, 
        cartItems
    } = useContext(BagContext)
    
    let allShirtsSelected: IProduct[] = []
    let teste: any = [] 

    const productAlreadyExists = cartItems.findIndex((cartItem) => cartItem.id === product.id)
    const [productAlreadyAdded, setProductAlreadyAdded] = useState(false)

    const checkProductAlreadyAdded = () => {
        if(productAlreadyExists < 0) {
            setProductAlreadyAdded(false)
        } else {
            setProductAlreadyAdded(true)
        }
    }

    async function handleAddProduct() {
        checkProductAlreadyAdded()

        if (productAlreadyExists < 0) {
            produce(BaseDataShirtSelected, draft => {
                allShirtsSelected.push(
                    { 
                        id: product.id, 
                        name: product.name, 
                        imageUrl: product.imageUrl, 
                        price: product.price, 
                        description: product.description,
                        defaultPriceId: product.defaultPriceId
                    }
                )
            })

            setAmountShirts(amountShirts + 1)
            if (typeof window !== 'undefined') { 
                const stateAmountShirt = JSON.stringify(amountShirts + 1)
                localStorage.setItem('@ignite-shop-2.0: amountShirts-state-1.0.0', stateAmountShirt)
            }

            teste = [...cartItems, ...allShirtsSelected]
            console.log(teste)
            setCartItems(teste)
        }
    }

    useEffect(() => {
        checkProductAlreadyAdded()
    }, [cartItems])

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}</span>

                    <p>{product.description}</p>

                    <button onClick={handleAddProduct} disabled={productAlreadyAdded} >Colocar na sacola</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    id: 'prod_NCPwKLy3R8yHQe'
                }
            }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (params != undefined) {
        const productId = params.id
        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        })

        const price = product.default_price as Stripe.Price
        let formattedPrice = 0.00

        if (price.unit_amount != null) {
            formattedPrice = (price.unit_amount / 100)
        }

        return {
            props: {
                product: {
                    id: product.id,
                    name: product.name,
                    imageUrl: product.images[0],
                    price: formattedPrice,
                    description: product.description,
                    defaultPriceId: price.id
                }
            },
            revalidate: 60 * 60 * 1
        }
    }
    return {
        props: {}
    }
}