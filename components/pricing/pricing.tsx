import {
  Box,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

import React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Section, SectionProps, SectionTitle } from '#components/section'

export interface PricingPlan {
  id: string
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
  features: Array<PricingFeatureProps>
  action?: { href: string; label: string }
  isRecommended?: boolean
}

export interface PricingProps extends Omit<SectionProps, 'children'> {
  description: React.ReactNode
  plans: Array<PricingPlan>
  onAction?: (plan: PricingPlan) => void
  children?: React.ReactNode
}

export const Pricing: React.FC<PricingProps> = (props) => {
  const { children, plans, title, description, onAction, ...rest } = props

  return (
    <Section id="pricing" {...rest}>
      <SectionTitle title={title} description={description} />

      <SimpleGrid columns={[1, null, 3]} spacing={6}>
        {plans.map((plan) => (
          <PricingBox
            key={plan.id}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            {...(plan.isRecommended && {
              borderColor: 'primary.500',
              _dark: { bg: 'gray.800', borderColor: 'primary.300' },
            })}
          >
            <PricingFeatures>
              {plan.features.map((feature, i) => (
                <PricingFeature key={i} {...feature} />
              ))}
            </PricingFeatures>
            {plan.action && (
              <ButtonLink
                colorScheme="primary"
                href={plan.action.href}
                onClick={() => onAction?.(plan)}
              >
                {plan.action.label}
              </ButtonLink>
            )}
          </PricingBox>
        ))}
      </SimpleGrid>

      {children}
    </Section>
  )
}

const PricingFeatures: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <VStack align="stretch" spacing="3" mb="8" flex="1">
      {children}
    </VStack>
  )
}

export interface PricingFeatureProps {
  title: React.ReactNode
  iconColor?: string
}

const PricingFeature: React.FC<PricingFeatureProps> = (props) => {
  const { title, iconColor = 'primary.500' } = props
  return (
    <HStack align="flex-start">
      <Icon
        as={FiCheck}
        color={iconColor}
        _dark={{ color: 'primary.300' }}
        mt="1"
      />
      <Text flex="1" fontSize="md">
        {title}
      </Text>
    </HStack>
  )
}

export interface PricingBoxProps extends Omit<StackProps, 'title'> {
  title: React.ReactNode
  description: React.ReactNode
  price: React.ReactNode
}

const PricingBox: React.FC<PricingBoxProps> = (props) => {
  const { title, description, price, children, ...rest } = props
  return (
    <VStack
      bg="white"
      borderRadius="lg"
      p="8"
      flex="1 0"
      alignItems="stretch"
      borderWidth="1px"
      borderColor="gray.200"
      _dark={{ bg: 'gray.800', borderColor: 'whiteAlpha.200' }}
      {...rest}
    >
      <Heading as="h3" fontSize="xl" fontWeight="semibold">
        {title}
      </Heading>
      <Box color="muted" fontSize="md">
        {description}
      </Box>
      <Box fontSize="3xl" fontWeight="bold" py="4">
        {price}
      </Box>
      <VStack align="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}
