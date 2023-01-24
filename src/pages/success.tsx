import { stripe } from "@/lib/stripe"
import { ImageContainer, SuccessContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import Link from "next/link"

interface SucceesProps {
    customerName: string,
    product: {
        imageUrl: string
    },
    quantity: number
}

export default function Success({ customerName, product, quantity }: SucceesProps) {
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
                <p>Uhuul <strong>{customerName}</strong>, sua compra de {quantity} camisetas já está a caminho da sua casa. </p>
                <Link href='/'>Voltar ao catálogo</Link>
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
            },
            quantity: session.amount_total
        }
    }
}