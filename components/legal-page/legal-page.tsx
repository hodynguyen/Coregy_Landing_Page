'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'

import legal, { LegalDocKey } from '#data/legal'

export const LegalPage: React.FC<{ doc: LegalDocKey }> = ({ doc }) => {
  const { title, notice, sections } = legal[doc]

  return (
    <Container
      maxW="container.md"
      px={{ base: 4, md: 8 }}
      pt={{ base: 32, lg: 40 }}
      pb="28"
    >
      <Stack spacing="8">
        <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }}>
          {title}
        </Heading>
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <AlertDescription fontSize="md">{notice}</AlertDescription>
        </Alert>
        {sections.map((section) => (
          <Box key={section.heading}>
            <Heading as="h2" fontSize="2xl" mb="3">
              {section.heading}
            </Heading>
            <Text color="muted">{section.body}</Text>
          </Box>
        ))}
      </Stack>
    </Container>
  )
}
