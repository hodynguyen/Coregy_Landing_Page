import {
  Box,
  Flex,
  Heading,
  ResponsiveValue,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'

export interface StepsProps {
  steps: Array<{ title: string; description: string }>
  columns?: ResponsiveValue<number>
}

export const Steps: React.FC<StepsProps> = ({
  steps,
  columns = [1, 2, steps.length],
}) => {
  return (
    <SimpleGrid as="ol" listStyleType="none" columns={columns} spacing="8">
      {steps.map((step, i) => (
        <Box as="li" key={step.title}>
          <Flex
            boxSize="9"
            align="center"
            justify="center"
            borderRadius="full"
            borderWidth="1px"
            borderColor="primary.500"
            color="primary.600"
            fontWeight="semibold"
            fontSize="md"
            mb="4"
            _dark={{ borderColor: 'primary.300', color: 'primary.300' }}
          >
            {i + 1}
          </Flex>
          <Heading as="h3" fontSize="xl" fontWeight="semibold" mb="2">
            {step.title}
          </Heading>
          <Text color="muted" fontSize="md">
            {step.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
