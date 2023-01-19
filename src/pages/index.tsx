import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '#c24040',

  span: {
    fontWeight: 'bold'
  },

  '&:hover': {
    backgroundColor: '#c76f6f',
  }
})

export default function Home() {
  return (
    <Button>
      <span>oi</span>
      Hello
    </Button>
  )
}
