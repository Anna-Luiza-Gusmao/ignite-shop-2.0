import { BagContext } from "@/context"
import { stripe } from "@/lib/stripe"
import { ImageContainer, SuccessContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import Link from "next/link"
import { useContext } from "react"

interface SucceesProps {
    customerName: string,
    product: {
        imageUrl: string
    }
}

export default function Success({ customerName, product }: SucceesProps) {
    const { amountShirts, setAmountShirts } = useContext(BagContext)

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
                <ImageContainer>
                    <Image src={product.imageUrl} width={120} height={110} alt="" />
                </ImageContainer>

                <h1>Compra Efetuada!</h1>
                <p>Uhuul <strong>{customerName}</strong>, sua compra de {amountShirts} camisetas já está a caminho da sua casa. </p>
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
    const product = session.line_items?.data[0].price?.product

    return {
        props: {
            customerName,
            product: {
                imageUrl: product.images[0]
            }
        }
    }
}