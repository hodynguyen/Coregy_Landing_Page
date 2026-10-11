'use client'

import {
  Avatar,
  Box,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaLinkedin } from 'react-icons/fa'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { InfoCard } from '#components/info-card'
import { PilotSection } from '#components/pilot-form'
import { Pricing } from '#components/pricing/pricing'
import { Section, SectionTitle } from '#components/section'
import { Steps } from '#components/steps'
import siteConfig from '#data/config'
import faq from '#data/faq'
import home from '#data/home'
import pricing from '#data/pricing'
import { solutions } from '#data/solutions'
import { track } from '#lib/analytics'

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ProblemSection />
      <SolutionsSection />
      <HowItWorksSection />
      <WhySection />
      <FounderSection />
      {siteConfig.flags.showProof && <ProofSection />}
      <PricingSection />
      <Faq {...faq} />
      <PilotSection location="home" />
    </Box>
  )
}

const HeroSection = () => {
  const { hero } = home
  return (
    <Box as="section" id="home">
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
            {hero.eyebrow}
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: '5xl', md: '7xl' }}
            lineHeight="1.1"
            letterSpacing="tight"
          >
            {hero.title}
          </Heading>
          <Text fontSize={{ base: 'xl', md: '2xl' }} color="muted" maxW="3xl">
            {hero.sub}
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" pt="2">
            <ButtonLink
              href="#pilot"
              colorScheme="primary"
              size="lg"
              onClick={() =>
                track('cta_book_pilot_click', { location: 'hero' })
              }
            >
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href="#solutions"
              size="lg"
              variant="outline"
              rightIcon={<Icon as={FiArrowRight} />}
            >
              {hero.secondaryCta}
            </ButtonLink>
          </Stack>
          <Wrap spacingX="6" spacingY="2" fontSize="md" color="muted">
            {hero.points.map((point) => (
              <HStack key={point} spacing="2">
                <Icon
                  as={FiCheck}
                  color="primary.500"
                  _dark={{ color: 'primary.300' }}
                />
                <Text as="span">{point}</Text>
              </HStack>
            ))}
          </Wrap>
        </Stack>
      </Container>
    </Box>
  )
}

const ProblemSection = () => {
  const { problem } = home
  return (
    <Section variant="alternate" innerWidth="container.xl">
      <SectionTitle title={problem.title} />
      <SimpleGrid columns={[1, null, 3]} spacing="6">
        {problem.items.map((item) => (
          <InfoCard key={item.title} {...item} />
        ))}
      </SimpleGrid>
    </Section>
  )
}

const SolutionsSection = () => {
  const copy = home.solutions
  return (
    <Section id="solutions" innerWidth="container.xl">
      <SectionTitle title={copy.title} description={copy.description} />
      <SimpleGrid columns={[1, null, 3]} spacing="6">
        {solutions.map((solution) => (
          <LinkBox
            as="article"
            key={solution.slug}
            borderRadius="lg"
            transition="border-color .2s ease-in"
            _hover={{ '& > div': { borderColor: 'primary.400' } }}
          >
            <InfoCard
              icon={solution.icon}
              title={
                <LinkOverlay
                  as={NextLink}
                  href={`/solutions/${solution.slug}`}
                  onClick={() =>
                    track('solution_card_click', { solution: solution.slug })
                  }
                >
                  {solution.name}
                </LinkOverlay>
              }
              description={solution.summary}
              display="flex"
              flexDirection="column"
            >
              <Text fontSize="md" mt="4" fontWeight="medium">
                {solution.audience}
              </Text>
              <HStack
                mt="auto"
                pt="6"
                spacing="1"
                fontSize="md"
                fontWeight="semibold"
                color="primary.600"
                _dark={{ color: 'primary.300' }}
              >
                <Text as="span">{copy.linkLabel}</Text>
                <Icon as={FiArrowRight} />
              </HStack>
            </InfoCard>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Section>
  )
}

const HowItWorksSection = () => {
  const { howItWorks } = home
  return (
    <Section id="how-it-works" variant="alternate" innerWidth="container.xl">
      <SectionTitle
        title={howItWorks.title}
        description={howItWorks.description}
      />
      <Steps steps={howItWorks.steps} />
    </Section>
  )
}

const WhySection = () => {
  const { why } = home
  return (
    <Section innerWidth="container.xl">
      <SectionTitle title={why.title} />
      <SimpleGrid columns={[1, null, 2]} spacing="6">
        {why.items.map((item) => (
          <InfoCard key={item.title} {...item} />
        ))}
      </SimpleGrid>
    </Section>
  )
}

const FounderSection = () => {
  const { founder } = home
  return (
    <Section variant="alternate">
      <SectionTitle title={founder.title} />
      <Card
        variant="outline"
        maxW="3xl"
        mx="auto"
        borderRadius="lg"
        _dark={{ bg: 'gray.900', borderColor: 'whiteAlpha.200' }}
      >
        <CardBody p={{ base: 6, md: 10 }}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 6, md: 8 }}
            align={{ base: 'flex-start', md: 'center' }}
          >
            <Avatar
              size="2xl"
              name={founder.name}
              src={founder.photo || undefined}
              bg="primary.500"
              color="white"
            />
            <Stack spacing="3">
              <Box>
                <Heading as="h3" fontSize="2xl">
                  {founder.name}
                </Heading>
                <Text color="muted" fontSize="md">
                  {founder.role}
                </Text>
              </Box>
              <Text fontSize="lg">{founder.bio}</Text>
              {siteConfig.linkedinUrl && (
                <Link
                  href={siteConfig.linkedinUrl}
                  isExternal
                  display="inline-flex"
                  alignItems="center"
                  gap="2"
                  fontSize="md"
                  fontWeight="medium"
                  color="primary.600"
                  _dark={{ color: 'primary.300' }}
                >
                  <Icon as={FaLinkedin} />
                  Coregy on LinkedIn
                </Link>
              )}
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Section>
  )
}

const ProofSection = () => {
  const { proof } = home
  if (!proof.items.length) return null

  return (
    <Section innerWidth="container.xl">
      <SectionTitle title={proof.title} />
      <SimpleGrid columns={[1, null, 2]} spacing="6">
        {proof.items.map((item) => (
          <InfoCard
            key={item.name}
            title={`“${item.quote}”`}
            description={`${item.name}, ${item.role} at ${item.company}`}
          />
        ))}
      </SimpleGrid>
    </Section>
  )
}

const PricingSection = () => {
  return (
    <Pricing
      {...pricing}
      innerWidth="container.xl"
      onAction={() => track('cta_book_pilot_click', { location: 'pricing' })}
    >
      <Text pt="8" textAlign="center" color="muted" fontSize="md">
        {pricing.note}
      </Text>
    </Pricing>
  )
}

export default Home
