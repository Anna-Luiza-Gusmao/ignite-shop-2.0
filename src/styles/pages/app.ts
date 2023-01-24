import { styled } from ".."

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh'
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    div: {
        padding: '0.75rem',
        background: '$gray800',
        borderRadius: 6,
        cursor: 'pointer'
    }
})

export const HeaderSuccess = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})