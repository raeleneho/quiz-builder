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

const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};



export const theme = extendTheme({
  components: {
    Input,
  },
  breakpoints
})