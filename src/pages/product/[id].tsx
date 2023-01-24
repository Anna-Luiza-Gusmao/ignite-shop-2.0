import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import { useRouter } from "next/router"
import Stripe from "stripe"
import SkeletonScreen from "./components/SkeletonScreen"
import { useEffect } from "react"

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

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter()

    if (isFallback) return <SkeletonScreen />

    async function handleBuyProduct() {
        try {
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            // Conectar com uma ferramenta de observabilidade (Datalog / Sentry)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

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
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button onClick={handleBuyProduct}>Colocar na sacola</button>
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
        let formattedPrice = ''

        if (price.unit_amount != null) {
            formattedPrice = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price.unit_amount / 100)
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