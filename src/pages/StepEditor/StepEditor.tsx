import { useParams } from 'react-router-dom';

import { useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';

import StepPreview from '../../components/StepPreview';
import { StepEditorProvider } from './StepEditorContext';

import { Box, Button, Container, Flex } from '@chakra-ui/react';

import { BlockClient, BlockType } from '../../../api/BlockClient';
import { blockLibrary } from '../../components/blocks/BlockLibrary';
import PopoverModal from '../../components/Popover';
import EditSideBar from '../../components/EditSideBar';

function StepEditor() {
  const { quizId, stepId } = useParams();
  const [step, setStep] = useState<Step | null>();

  const { data: stepRes } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      if (!stepId || !quizId) {
        return;
      }
      const step = await StepClient.getStep({ stepId, quizId });
      setStep(step);
      return step;
    },
    enabled: !!stepId,
  });

  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId: quizId ?? '',
      stepId: stepId ?? '',
      type: blockType,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  return (
    <>
      <StepEditorProvider stepId={stepId}>
        <Box w="100%" p={6}>
          <Flex>
            <PopoverModal header="Select block type:">
              <Flex alignItems="center" justify="space-around" gap="2">
                <Button size="sm" onClick={() => addBlock(BlockType.INPUT)}>
                  {BlockType.INPUT}
                </Button>
                <Button size="sm" onClick={() => addBlock(BlockType.TEXTAREA)}>
                  {BlockType.TEXTAREA}
                </Button>
              </Flex>
            </PopoverModal>
          </Flex>
          <Box className="step-editor">
            <StepPreview step={step} quizId={quizId ?? ''} />
          </Box>
        </Box>

        <EditSideBar stepId={stepId ?? ''} />
      </StepEditorProvider>
    </>
  );
}

export default StepEditor;
