import { defineStyleConfig, extendTheme } from '@chakra-ui/react'

const Input = defineStyleConfig({
  variants: {
    solid: {
      bg: 'white.500',
      color: 'white',
    },
  },
  defaultProps: {
    variant: 'solid',
    size: 'sm'
  }
})


export const theme = extendTheme({
  components: {
    Input,
  },
})