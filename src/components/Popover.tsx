import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PopoverProps {
  header: string;
  triggerBtn?: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

function PopoverModal({ header, children }: PopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="teal" aria-label="add block">
          Add Block
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverModal;
