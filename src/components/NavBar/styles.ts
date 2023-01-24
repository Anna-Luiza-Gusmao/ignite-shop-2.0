import { styled } from "@stitches/react"

export const AmountShirts = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.75rem',

    position: 'relative',
    width: 14,
    height: 14,
    right: -34,
    top: 18,

    backgroundColor: '$green500 !important',
    borderRadius:  '9999px !important',
    color: '#FFF',

    flex: 'none',
    order: '1',
    flexGrow: '0',
    zIndex: '1',
})

export const MenuBar = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 0,
    top: 0,
    maxWidth: 480,
    height: '100%',
    padding: '0.75rem',
    cursor: 'pointer',

    zIndex: 2,
    background: '$gray800',

    svg: {
        marginLeft: '28rem'
    }
})

export const ItemsContainer = styled('div', {
    padding: '1.5rem 3rem 3rem 3rem',

    footer: {
        position: 'absolute',
        top: '75%',
        width: '90%'
    },

    button: {
        width: '100%',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',

        '&:hover': {
            backgroundColor: '$green300',
        }
    }
})

export const ProductContainer = styled('section', {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    gap: '1.25rem',

    div: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',

        p: {
            color: '$gray300',
            fontSize: '$md',
        },
        strong: {
            color: '$gray100'
        },
        span: {
            color: '$green500'
        }
    }
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 102,
    height: 93,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%) !important',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    }
})

export const AmountItems = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    color: '$gray100'
})

export const PriceItems = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    color: '$gray100',
    fontWeight: 700,
    fontSize: '$xl',

    marginBottom: '3.5rem'
})