import { Box, BoxProps, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'

export interface InfoCardProps extends Omit<BoxProps, 'title'> {
  icon?: IconType
  title: React.ReactNode
  description: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = (props) => {
  const { icon, title, description, children, ...rest } = props
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={{ base: 6, md: 8 }}
      height="full"
      _dark={{ bg: 'gray.800', borderColor: 'whiteAlpha.200' }}
      {...rest}
    >
      {icon && (
        <Flex
          boxSize="10"
          align="center"
          justify="center"
          borderRadius="md"
          bg="primary.50"
          color="primary.600"
          _dark={{ bg: 'whiteAlpha.100', color: 'primary.300' }}
          mb="5"
        >
          <Icon as={icon} boxSize="5" />
        </Flex>
      )}
      <Heading as="h3" fontSize="xl" fontWeight="semibold" mb="2">
        {title}
      </Heading>
      <Text color="muted" fontSize="md">
        {description}
      </Text>
      {children}
    </Box>
  )
}
