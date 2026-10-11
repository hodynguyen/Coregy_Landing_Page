import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  IconButtonProps,
  LinkProps,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import useRouteChanged from 'hooks/use-route-changed'
import { usePathname } from 'next/navigation'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Logo } from '#components/layout/logo'
import siteConfig from '#data/config'
import { usePilotHref } from '#hooks/use-pilot-href'
import { track } from '#lib/analytics'

interface NavLinkProps extends LinkProps {
  href: string
}

function NavLink({ href, children, ...rest }: NavLinkProps) {
  const pathname = usePathname()
  const bgHoverColor = useColorModeValue('gray.100', 'whiteAlpha.100')
  const isActive = pathname === href

  return (
    <Link
      href={href}
      display="flex"
      minH="40px"
      px="8"
      py="3"
      transition="0.2s all"
      fontWeight={isActive ? 'semibold' : 'medium'}
      borderBottomWidth="1px"
      _hover={{ bg: bgHoverColor, textDecoration: 'none' }}
      {...rest}
    >
      {children}
    </Link>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose = () => {} } = props
  const closeBtnRef = React.useRef<HTMLButtonElement>(null)
  const bgColor = useColorModeValue('white', 'gray.900')
  const pilotHref = usePilotHref()

  useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <RemoveScroll forwardProps>
      <Flex
        direction="column"
        w="100%"
        bg={bgColor}
        h="100vh"
        overflow="auto"
        pos="fixed"
        inset="0"
        zIndex="modal"
        pb="8"
      >
        <Flex justify="space-between" px="8" pt="4" pb="4">
          <Logo />
          <CloseButton ref={closeBtnRef} onClick={onClose} />
        </Flex>
        <Stack alignItems="stretch" spacing="0">
          {siteConfig.header.links.map(({ href, id, label, children }) =>
            children ? (
              <Box key={label}>
                <Text
                  px="8"
                  pt="4"
                  pb="1"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {label}
                </Text>
                {children.map((child) => (
                  <NavLink key={child.href} href={child.href} onClick={onClose}>
                    {child.label}
                  </NavLink>
                ))}
              </Box>
            ) : (
              <NavLink key={label} href={href || `/#${id}`} onClick={onClose}>
                {label}
              </NavLink>
            ),
          )}
        </Stack>
        <Box px="8" pt="8">
          <ButtonLink
            href={pilotHref}
            colorScheme="primary"
            width="full"
            onClick={() => {
              track('cta_book_pilot_click', { location: 'mobile_nav' })
              onClose()
            }}
          >
            {siteConfig.header.cta.label}
          </ButtonLink>
        </Box>
      </Flex>
    </RemoveScroll>
  )
}

export const MobileNavButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', lg: 'none' }}
        fontSize="20px"
        color={useColorModeValue('gray.800', 'inherit')}
        variant="ghost"
        icon={<AiOutlineMenu />}
        {...props}
        aria-label="Open menu"
      />
    )
  },
)

MobileNavButton.displayName = 'MobileNavButton'
