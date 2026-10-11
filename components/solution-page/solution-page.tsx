'use client'

import {
  Box,
  Container,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FiArrowRight, FiCheck, FiMinus } from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { PilotSection } from '#components/pilot-form'
import { Section, SectionTitle } from '#components/section'
import { Steps } from '#components/steps'
import { SolutionSlug, getSolution } from '#data/solutions'
import { track } from '#lib/analytics'

export interface SolutionPageProps {
  slug: SolutionSlug
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ slug }) => {
  const solution = getSolution(slug)
  if (!solution) return null

  return (
    <Box>
      <Box as="section">
        <Container
          maxW="container.xl"
          px={{ base: 4, md: 8 }}
          pt={{ base: 32, lg: 44 }}
          pb={{ base: 20, lg: 28 }}
        >
          <Stack spacing={{ base: 6, md: 8 }} maxW="4xl">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="primary.600"
              _dark={{ color: 'primary.300' }}
            >
              {solution.name}
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: '5xl', md: '7xl' }}
              lineHeight="1.1"
              letterSpacing="tight"
            >
              {solution.headline}
            </Heading>
            <Text fontSize={{ base: 'xl', md: '2xl' }} color="muted">
              {solution.sub}
            </Text>
            <Text fontSize="md" fontWeight="medium">
              {solution.audience}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing="4">
              <ButtonLink
                href="#pilot"
                colorScheme="primary"
                size="lg"
                onClick={() =>
                  track('cta_book_pilot_click', {
                    location: `solution_${slug}_hero`,
                  })
                }
              >
                Book a free pilot
              </ButtonLink>
              <ButtonLink
                href="#how-it-works"
                size="lg"
                variant="outline"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                How it works
              </ButtonLink>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Section variant="alternate" innerWidth="container.xl">
        <SectionTitle title="Before and after" />
        <SimpleGrid columns={[1, null, 2]} spacing="6">
          <CompareCard
            title="Today"
            items={solution.before}
            icon={FiMinus}
            muted
          />
          <CompareCard
            title="With the agent"
            items={solution.after}
            icon={FiCheck}
          />
        </SimpleGrid>
      </Section>

      <Section id="how-it-works" innerWidth="container.xl">
        <SectionTitle title="How it works" />
        <Steps steps={solution.steps} columns={[1, null, 3]} />
      </Section>

      <Section variant="alternate" innerWidth="container.xl">
        <SectionTitle
          title="Works with the tools you already use"
          description="Don't see yours? Most tools with an API can be connected."
        />
        <Wrap justify={['flex-start', null, 'center']} spacing="3">
          {solution.integrations.map((name) => (
            <Tag
              key={name}
              size="lg"
              variant="outline"
              borderRadius="full"
              px="4"
              py="2"
            >
              {name}
            </Tag>
          ))}
        </Wrap>
      </Section>

      <Faq items={solution.faq} />

      <PilotSection
        location={`solution_${slug}`}
        defaultIndustry={solution.industry}
      />
    </Box>
  )
}

interface CompareCardProps {
  title: string
  items: string[]
  icon: IconType
  muted?: boolean
}

const CompareCard: React.FC<CompareCardProps> = ({
  title,
  items,
  icon,
  muted,
}) => {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor={muted ? 'gray.200' : 'primary.500'}
      borderRadius="lg"
      p={{ base: 6, md: 8 }}
      _dark={{
        bg: 'gray.900',
        borderColor: muted ? 'whiteAlpha.200' : 'primary.300',
      }}
    >
      <Heading as="h3" fontSize="xl" fontWeight="semibold" mb="5">
        {title}
      </Heading>
      <List spacing="3">
        {items.map((item) => (
          <ListItem key={item} display="flex" fontSize="md">
            <ListIcon
              as={icon}
              mt="1"
              color={muted ? 'gray.400' : 'primary.500'}
              _dark={{ color: muted ? 'gray.500' : 'primary.300' }}
            />
            <Text as="span" color={muted ? 'muted' : undefined}>
              {item}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
