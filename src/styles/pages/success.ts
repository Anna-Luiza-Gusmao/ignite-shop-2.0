import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100'
    }, 

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300',
        }
    },

    div: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '2rem'
    }
})

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    width: '100%',
    maxWidth: 140,
    height: 140,
    borderRadius: 9999,
    padding: '0.25rem',
    marginLeft: '-3.5rem',
    zIndex: '2',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:first-child': {
        marginLeft: '0',
    },

    img: {
        objectFit: 'cover'
    }
})