import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';
import { BlockClient, BlockType } from '../../api/BlockClient';
import { blockLibrary } from './blocks/BlockLibrary';
import { AddIcon } from '@chakra-ui/icons';
import { BlockInserter } from './BlockInserter';

interface PopoverProps {
  title?: string;
  quizId?: string;
  stepId?: string;
  triggerIcon?: boolean;
  // children: ReactNode | ReactNode[];
}

function NewBlockPopoverModal({ title, quizId, stepId, triggerIcon }: PopoverProps) {
  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId: quizId ?? '',
      stepId: stepId ?? '',
      type: blockType,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  // interface TriggerBtnProps {
  //   iconOnly?: boolean;
  //   text: string;
  // }

  // const TriggerBtn = ({ iconOnly, text }: TriggerBtnProps) => {
  //   return iconOnly ? (
  //     <IconButton
  //       className="inserter-icon"
  //       isRound={true}
  //       colorScheme="teal"
  //       aria-label="insert new block"
  //       fontSize="12px"
  //       size="sm"
  //       icon={<AddIcon />}
  //     />
  //   ) : (
  //     <Button colorScheme="teal" aria-label="add block">
  //       {' '}
  //       {text}
  //     </Button>
  //   );
  // };

  return (
    <Popover>
      <PopoverTrigger>
        {/* {<TriggerBtn text={'Add Block'} />} */}
        {triggerIcon ? (
          <IconButton
            className="inserter-icon"
            isRound={true}
            colorScheme="teal"
            aria-label="insert new block"
            fontSize="12px"
            size="sm"
            icon={<AddIcon />}
          />
        ) : (
          <Button colorScheme="teal" aria-label="add block">
            {' '}
            Add Block
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{title ? title : 'Select block type:'}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <BlockInserter stepId={stepId ?? ''} quizId={quizId ?? ''} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default NewBlockPopoverModal;
