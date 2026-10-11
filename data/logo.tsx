import { HTMLChakraProps, chakra, useColorModeValue } from '@chakra-ui/react'

import { logoPaths, logoViewBox } from './logo-paths'

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  const color = useColorModeValue('#231f20', '#fff')
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      widths="10em"
      xHeight="10em"
      viewBox={logoViewBox}
      {...props}
    >
      {logoPaths.map((d) => (
        <path key={d} fill={color} d={d} />
      ))}
    </chakra.svg>
  )
}
