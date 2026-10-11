import { Box, Flex, VisuallyHidden } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'

import * as React from 'react'

import siteConfig from '#data/config'
import { Logo as LogoMark } from '#data/logo'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Logo = ({ href = '/', onClick }: LogoProps) => {
  return (
    <Flex h="8" flexShrink="0" alignItems="flex-start">
      <Link
        href={href}
        display="flex"
        p="1"
        borderRadius="sm"
        onClick={onClick}
      >
        <Box as={LogoMark} height="30px" />
        <VisuallyHidden>{siteConfig.name}</VisuallyHidden>
      </Link>
    </Flex>
  )
}
