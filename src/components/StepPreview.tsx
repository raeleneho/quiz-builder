import { useQueries } from '@tanstack/react-query';
import { Block, BlockClient, blockRoute } from '../../api/BlockClient';
import { Step } from '../../api/StepClient';

// import { BlockRenderer } from "../pages/StepEditor";
import { BlockInserter } from './BlockInserter';

import { blockLibrary } from './blocks/BlockLibrary';
import { useStepEditorContext } from '../pages/StepEditor/StepEditorContext';
import {
  Box,
  Container,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface BlockRendererProps {
  // block.id?: string;
  block?: Block | null;
  isSelected?: boolean;
}

export const BlockRenderer = ({ block }: BlockRendererProps): JSX.Element => {
  if (!block) {
    return <></>;
  }

  const BlockComponent = blockLibrary[block?.type].block;

  return <BlockComponent {...block.data} />;
};

interface StepPreviewProps {
  step?: Step | null;
  quizId: string;
}

function StepPreview({ step, quizId }: StepPreviewProps) {
  const stepEditorContext = useStepEditorContext();

  const blocksRes = useQueries({
    queries:
      step?.blocks?.map((blockId: string) => {
        return {
          queryKey: [blockRoute, blockId],
          queryFn: async () => {
            return BlockClient.getBlock({ blockId, stepId: step?.id ?? '' });
          },
        };
      }) ?? [],
  });

  return (
    <>
      <VStack py={4}>
        {blocksRes?.map(({ data: block }, index: number) => {
          const isSelected = stepEditorContext?.selectedBlockId === block?.id;
          return (
            <Box
              w="20vw"
              p={1}
              color="white"
              className={`content-block ${isSelected ? 'content-block-hightlight' : ''}`}
              onClick={() => stepEditorContext?.setSelectedBlockId(block?.id ?? '')}
            >
              <BlockRenderer block={isSelected ? stepEditorContext?.block : block} isSelected={isSelected} />

              <Popover>
                <PopoverTrigger>
                  <IconButton
                    className="inserter-icon"
                    isRound={true}
                    colorScheme="teal"
                    aria-label="insert new block"
                    fontSize="12px"
                    size="sm"
                    icon={<AddIcon />}
                  />
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Select block type:</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <BlockInserter position={index} stepId={step?.id ?? ''} quizId={quizId ?? ''} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          );
        })}
      </VStack>
    </>
  );
}

export default StepPreview;
