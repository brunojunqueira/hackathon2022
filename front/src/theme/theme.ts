import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      "app-background": "#F8F8F8",
      "app-lightblack": "#49484F",
      "app-darkgray": "#AAAAAA",
      "app-brand-yellow": "#FFC600",
      "app-brand-green": "#008441",
      "app-brand-gradient": "linear(to-r, rgba(255,198,0,1), rgba(0,132,65,1))",
    },
  },
})