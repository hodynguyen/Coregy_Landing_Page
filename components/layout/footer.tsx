import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, LinkProps } from '@saas-ui/react'

import siteConfig from '#data/config'
import { Logo as LogoMark } from '#data/logo'

export interface FooterProps extends BoxProps {
  columns?: number
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props
  return (
    <Box
      bg="white"
      borderTopWidth="1px"
      borderColor="gray.200"
      _dark={{ bg: 'gray.900', borderColor: 'whiteAlpha.200' }}
      {...rest}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py="10">
        <SimpleGrid
          columns={{ base: 1, md: columns }}
          spacing={{ base: 8, md: 0 }}
        >
          <Stack spacing="6">
            <Stack alignItems="flex-start">
              <Flex>
                <Box as={LogoMark} flex="1" height="32px" />
              </Flex>
              <Text fontSize="md" color="muted" maxW="md">
                {siteConfig.seo.description}
              </Text>
            </Stack>
            <Copyright>
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </Copyright>
          </Stack>

          <HStack
            justify={{ base: 'flex-start', md: 'flex-end' }}
            spacing="6"
            alignSelf={{ base: 'flex-start', md: 'flex-end' }}
            wrap="wrap"
          >
            {siteConfig.footer.links.map(({ href, label, isExternal }) => (
              <FooterLink key={href} href={href} isExternal={isExternal}>
                {label}
              </FooterLink>
            ))}
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({ children }) => {
  return (
    <Text color="muted" fontSize="sm">
      {children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      color="muted"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'gray.900',
        _dark: { color: 'white' },
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
