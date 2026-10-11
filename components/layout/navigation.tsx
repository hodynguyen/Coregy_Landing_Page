import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { FiChevronDown } from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { MobileNavButton } from '#components/mobile-nav'
import { MobileNavContent } from '#components/mobile-nav'
import { NavLink } from '#components/nav-link'
import siteConfig from '#data/config'
import { usePilotHref } from '#hooks/use-pilot-href'
import { useScrollSpy } from '#hooks/use-scrollspy'
import { track } from '#lib/analytics'

import ThemeToggle from './theme-toggle'

const spySelectors = siteConfig.header.links
  .filter(({ id }) => id)
  .map(({ id }) => `[id="${id}"]`)

const spyOptions = { threshold: 0.5 }

const Navigation: React.FC = () => {
  const mobileNav = useDisclosure()
  const path = usePathname()
  const pilotHref = usePilotHref()
  const activeId = useScrollSpy(spySelectors, spyOptions)

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null)

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, id, label, children }) => {
        if (children) {
          return (
            <Box key={label} display={{ base: 'none', lg: 'block' }}>
              <Menu placement="bottom-start">
                <MenuButton
                  as={Button}
                  variant="nav-link"
                  lineHeight="2rem"
                  isActive={!!path?.startsWith('/solutions/')}
                  rightIcon={<Icon as={FiChevronDown} />}
                >
                  {label}
                </MenuButton>
                <MenuList py="2" minW="xs">
                  {children.map((child) => (
                    <MenuItem
                      key={child.href}
                      as={NextLink}
                      href={child.href}
                      px="4"
                      py="2"
                    >
                      <Box>
                        <Text fontWeight="medium">{child.label}</Text>
                        {child.description && (
                          <Text fontSize="sm" color="muted">
                            {child.description}
                          </Text>
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          )
        }

        return (
          <NavLink
            display={{ base: 'none', lg: 'block' }}
            href={href || `/#${id}`}
            key={label}
            isActive={!!(path === '/' && id && activeId === id)}
          >
            {label}
          </NavLink>
        )
      })}

      <ButtonLink
        href={pilotHref}
        colorScheme="primary"
        size="sm"
        display={{ base: 'none', md: 'inline-flex' }}
        ms={{ md: 2 }}
        onClick={() => track('cta_book_pilot_click', { location: 'header' })}
      >
        {siteConfig.header.cta.label}
      </ButtonLink>

      <ThemeToggle />

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  )
}

export default Navigation
