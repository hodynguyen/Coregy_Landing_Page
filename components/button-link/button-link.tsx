import { Button, ButtonProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export type ButtonLinkProps = ButtonProps & {
  href: string
  isExternal?: boolean
}

// Renders a single <a> styled as a button (no nested <a><button>)
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  isExternal,
  children,
  ...props
}) => {
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Button as={NextLink} href={href} {...externalProps} {...props}>
      {children}
    </Button>
  )
}
