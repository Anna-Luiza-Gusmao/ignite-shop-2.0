import { BagContext } from "@/context"
import { stripe } from "@/lib/stripe"
import { ImageContainer, SuccessContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import Link from "next/link"
import { useContext } from "react"
import Stripe from "stripe"

interface SucceesProps {
    customerName: string,
    products: Stripe.LineItem[],
    quantity: number
}

export default function Success({ customerName, quantity, products }: SucceesProps) {
    const { setAmountShirts } = useContext(BagContext)

    const resetAmountShirts = () => {
        if (typeof window !== 'undefined') { 
            const stateAmountShirt = JSON.stringify(0)
            localStorage.setItem('@ignite-shop-2.0: amountShirts-state-1.0.0', stateAmountShirt)
        }
        setAmountShirts(0)
    }

    return (
        <>
            <Head>
                <title>Compra Efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <div>
                    {
                        products.map((shirt) => (
                            <ImageContainer>
                                <Image src={shirt.price?.product.images[0]} width={120} height={110} alt="" />
                            </ImageContainer>
                        ))
                    }
                </div>
                <h1>Compra Efetuada!</h1>
                <p>Uhuul <strong>{customerName}</strong>, sua compra de {quantity} camisetas já está a caminho da sua casa. </p>
                <Link href='/' onClick={resetAmountShirts}>Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    const products = session.line_items?.data

    return {
        props: {
            customerName,
            products: products,
            quantity: products?.length
        }
    }
}