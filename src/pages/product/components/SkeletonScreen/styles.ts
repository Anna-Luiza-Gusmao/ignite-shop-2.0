import { styled } from "@/styles"

export const ProductContainer = styled('main', {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',
    maxWidth: 1180,
    height: 656,
    margin: '0 auto'
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 576,
    height: 'calc(656px - 0.5rem)',
    background: '$gray800',
    borderRadius: 8
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    width: 576,

    h1: {
        width: '100%',
        height: 24,
        background: '$gray800',
        marginBottom: '1rem'
    },
    
    span: {
        width: '100%',
        height: 24,
        background: '$gray800',
        marginBottom: '2rem'
    },

    p: {
        width: '100%',
        height: '8rem',
        background: '$gray800'
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$gray800',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        height: 69,
        cursor: 'not-allowed',
        fontWeight: 'bold',
        fontSize: '$md',
    }
})