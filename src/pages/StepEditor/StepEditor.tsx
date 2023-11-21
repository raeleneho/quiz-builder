import { useParams } from 'react-router-dom';

import { useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';

import { BlockEditor } from '../../components/blocks/BlockEditor';
import StepPreview from '../../components/StepPreview';
import { StepEditorProvider } from './StepEditorContext';
import Tabs from '../../components/Tabs/Tabs';

import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import TabTitle from '../../components/Tabs/TabTitle';
import TabContent from '../../components/Tabs/TabContent';
import StepSettings from '../../components/StepSettings';
import { useTabsContext } from '../../components/Tabs/TabsContext';
import Tab from '../../components/Tabs/Tab';
import { BlockClient, BlockType } from '../../../api/BlockClient';
import { blockLibrary } from '../../components/blocks/BlockLibrary';
import PopoverModal from '../../components/Popover';

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

  const tabsData = [
    {
      id: '1',
      title: 'Step Settings',
      component: () => <StepSettings />,
    },
    {
      id: '2',
      title: 'Block Settings',
      component: () => <BlockEditor stepId={stepId ?? ''} />,
    },
    { id: '3', title: 'Data', component: () => <></> },
  ];

  // const AddBlockBtn = () => {
  //   return (
  //     <Button colorScheme="teal" aria-label="add block">
  //       Add Block
  //     </Button>
  //   );
  // };

  return (
    <>
      <StepEditorProvider stepId={stepId}>
        <Box w="100%">
          <Box display="flex" p={4}>
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
          </Box>

          <StepPreview step={step} quizId={quizId ?? ''} />

          <Tabs>
            <Flex>
              {tabsData.map(({ id, title }) => (
                <>
                  <Tab key={id} id={id}>
                    {title}
                  </Tab>
                </>
              ))}
            </Flex>

            {tabsData.map(({ id, component: TabComponent }) => (
              <>
                <TabContent id={id}>
                  <TabComponent />
                </TabContent>
              </>
            ))}
          </Tabs>
        </Box>
      </StepEditorProvider>
    </>
  );
}

export default StepEditor;
