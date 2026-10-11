'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  List,
  ListIcon,
  ListItem,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

import * as React from 'react'

import { Section } from '#components/section'
import siteConfig from '#data/config'
import pilot, { Industry, industries } from '#data/pilot'
import { track } from '#lib/analytics'

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL

type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error'

interface Values {
  name: string
  email: string
  website: string
  industry: string
  task: string
  tools: string
}

const toMailto = (values: Values) => {
  const { fields } = pilot
  const body = [
    `${fields.name}: ${values.name}`,
    `${fields.email}: ${values.email}`,
    `${fields.website}: ${values.website}`,
    `${fields.industry}: ${values.industry}`,
    `${fields.task}\n${values.task}`,
    `${fields.tools}: ${values.tools}`,
  ].join('\n\n')
  const subject = `Pilot request${values.website ? ` — ${values.website}` : ''}`

  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

export interface PilotFormProps {
  defaultIndustry?: Industry
  // Where the form is shown, sent with analytics events
  location: string
}

export const PilotForm: React.FC<PilotFormProps> = ({
  defaultIndustry,
  location,
}) => {
  const [status, setStatus] = React.useState<Status>('idle')
  const [values, setValues] = React.useState<Values>({
    name: '',
    email: '',
    website: '',
    industry: defaultIndustry ?? '',
    task: '',
    tools: '',
  })

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!FORM_ENDPOINT) {
      track('pilot_form_submit', {
        location,
        industry: values.industry,
        method: 'mailto',
      })
      window.location.href = toMailto(values)
      setStatus('mailto')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...values,
          source: location,
          _subject: 'Pilot request',
          _replyto: values.email,
        }),
      })
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)
      track('pilot_form_submit', {
        location,
        industry: values.industry,
        method: 'endpoint',
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Alert status="success" borderRadius="lg" p="6">
        <AlertIcon />
        <AlertDescription>{pilot.success}</AlertDescription>
      </Alert>
    )
  }

  const { fields } = pilot

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Stack spacing="5">
        <SimpleGrid columns={[1, null, 2]} spacing="5">
          <FormControl isRequired>
            <FormLabel>{fields.name}</FormLabel>
            <Input
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={onChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{fields.email}</FormLabel>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{fields.website}</FormLabel>
            <Input
              name="website"
              inputMode="url"
              autoComplete="url"
              placeholder="example.com"
              value={values.website}
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>{fields.industry}</FormLabel>
            <Select
              name="industry"
              placeholder="Select your industry"
              value={values.industry}
              onChange={onChange}
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>
        <FormControl isRequired>
          <FormLabel>{fields.task}</FormLabel>
          <Textarea
            name="task"
            rows={4}
            value={values.task}
            onChange={onChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{fields.tools}</FormLabel>
          <Input
            name="tools"
            placeholder="e.g. Outlook, Xero, Google Sheets"
            value={values.tools}
            onChange={onChange}
          />
        </FormControl>

        {status === 'mailto' && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <AlertDescription>
              {pilot.mailto} If nothing opened, email{' '}
              <Link href={toMailto(values)} textDecoration="underline">
                {siteConfig.contactEmail}
              </Link>
              .
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>
              {pilot.error}{' '}
              <Link href={toMailto(values)} textDecoration="underline">
                {siteConfig.contactEmail}
              </Link>
              .
            </AlertDescription>
          </Alert>
        )}

        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing="4"
          align={{ base: 'stretch', sm: 'center' }}
        >
          <Button
            type="submit"
            colorScheme="primary"
            size="lg"
            isLoading={status === 'submitting'}
          >
            {pilot.submit}
          </Button>
          {BOOKING_URL && (
            <Link
              href={BOOKING_URL}
              isExternal
              fontWeight="medium"
              color="primary.600"
              _dark={{ color: 'primary.300' }}
              textAlign={{ base: 'center', sm: 'left' }}
              onClick={() =>
                track('cta_book_pilot_click', {
                  location: `${location}_booking_link`,
                })
              }
            >
              <HStack as="span" spacing="1" display="inline-flex">
                <span>{pilot.bookingLabel}</span>
                <Icon as={FiArrowRight} />
              </HStack>
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export interface PilotSectionProps extends PilotFormProps {
  title?: string
}

export const PilotSection: React.FC<PilotSectionProps> = ({
  title = pilot.title,
  ...formProps
}) => {
  return (
    <Section id="pilot" variant="alternate" innerWidth="container.xl">
      <SimpleGrid columns={[1, null, null, 5]} spacing={{ base: 10, lg: 16 }}>
        <Stack spacing="5" gridColumn={{ lg: 'span 2' }}>
          <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }}>
            {title}
          </Heading>
          <Text color="muted" fontSize="lg">
            {pilot.description}
          </Text>
          <List spacing="2">
            {pilot.points.map((point) => (
              <ListItem key={point} fontSize="md">
                <ListIcon
                  as={FiCheck}
                  color="primary.500"
                  _dark={{ color: 'primary.300' }}
                />
                {point}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Box
          gridColumn={{ lg: 'span 3' }}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="lg"
          p={{ base: 5, md: 8 }}
          _dark={{ bg: 'gray.900', borderColor: 'whiteAlpha.200' }}
        >
          <PilotForm {...formProps} />
        </Box>
      </SimpleGrid>
    </Section>
  )
}
