import {
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";
// import { Box } from "framer-motion";

function StepSettings() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Chakra App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button colorScheme="teal">Sign Up</Button>
        <Button colorScheme="teal">Log in</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default StepSettings;
