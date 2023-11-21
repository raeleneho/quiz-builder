import { useQueries } from '@tanstack/react-query';
import { Block, BlockClient, blockRoute } from '../../api/BlockClient';
import { Step } from '../../api/StepClient';

// import { BlockRenderer } from "../pages/StepEditor";
import { BlockInserter } from './BlockInserter';

import { blockLibrary } from './blocks/BlockLibrary';
import { useStepEditorContext } from '../pages/StepEditor/StepEditorContext';
import {
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';

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
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      {blocksRes?.map(({ data: block }, index: number) => {
        const isSelected = stepEditorContext?.selectedBlockId === block?.id;
        return (
          <>
            <Container>
              <VStack w="30%" py={4}>
                <Box
                  w="20vw"
                  color="white"
                  className={`${
                    stepEditorContext?.selectedBlockId === block?.id || stepEditorContext?.selectedBlockId === hoveredBlockId
                      ? 'content-block-hightlight'
                      : ''
                  }`}
                  onClick={() => stepEditorContext?.setSelectedBlockId(block?.id ?? '')}
                  onMouseEnter={() => setHoveredBlockId(block?.id ?? '')}
                  onMouseLeave={() => setHoveredBlockId(null)}
                >
                  <BlockRenderer block={isSelected ? stepEditorContext?.block : block} isSelected={isSelected} />
                </Box>

                {stepEditorContext?.selectedBlockId === block?.id && (
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
                )}
              </VStack>
            </Container>
          </>
        );
      })}
    </>
  );
}

export default StepPreview;
