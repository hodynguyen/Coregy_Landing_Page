import { HTMLChakraProps, chakra, useColorModeValue } from '@chakra-ui/react'

import { logoColors, logoSize, mark, wordmarkPath } from './logo-paths'

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  const ink = useColorModeValue(logoColors.ink, logoColors.inkDark)
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${logoSize.width} ${logoSize.height}`}
      aria-hidden="true"
      {...props}
    >
      <rect width="48" height="48" rx={mark.radius} fill={logoColors.accent} />
      <path
        d={mark.arc}
        fill="none"
        stroke="#fff"
        strokeWidth={mark.arcWidth}
        strokeLinecap="round"
      />
      <circle {...mark.dot} fill="#fff" />
      <path d={wordmarkPath} fill={ink} />
    </chakra.svg>
  )
}
