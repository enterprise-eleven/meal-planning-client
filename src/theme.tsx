import { extendTheme } from '@chakra-ui/react'

const fonts = { nunito: `'Nunito Sans', sans-serif` }

const colors = {
  brand: {
    // https://coolors.co/f58f29-fff3f0-333533-7b9ea8-dc851f
    darkOrange: '#F58F29',
    snow: '#FFF3F0',
    jet: '#333533',
    pewterBlue: '#7B9EA8',
    fulvous: '#DC851F',
  },
}

const styles = {
  global: {
    body: {
      bg: 'brand.snow',
      color: 'brand.jet',
      fontFamily: 'nunito',
    },
  },
}

const components = {
  // Checkbox: {
  //   parts: ['container', 'control', 'label', 'icon'],
  //   baseStyle: {
  //     control: {
  //       borderColor: 'brand.darkOrange',
  //       _focus: {
  //         borderColor: 'brand.darkOrange',
  //       },
  //     },
  //   },
  // },
  Button: {
    baseStyle: {
      backgroundColor: 'brand.darkOrange',
      color: 'brand.jet',
      fontWeight: 'bold',
      _hover: {
        backgroundColor: 'brand.fulvous',
      },
    },
    defaultProps: {
      size: 'md',
      variant: '',
    },
  },
}

const theme = extendTheme({ colors, fonts, styles, components })

export default theme
