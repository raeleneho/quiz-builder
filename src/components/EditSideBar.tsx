import TabContent from './Tabs/TabContent';
import StepSettings from './StepSettings';
import { BlockEditor } from './blocks/BlockEditor';
import Tabs from './Tabs/Tabs';
import Tab from './Tabs/Tab';
import { Button, Divider, Flex } from '@chakra-ui/react';

interface EditSideBarProps {
  stepId: string;
}

export function EditSideBar({ stepId }: EditSideBarProps) {
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

  return (
    <div className="sidebar right-sidebar">
      <Tabs>
        <Flex gap={3}>
          {tabsData.map(({ id, title }) => (
            <>
              <Tab key={id} id={id}>
                {title}
              </Tab>
            </>
          ))}
        </Flex>
        <Divider className="tabs-divider" orientation="horizontal" />

        <div className="tabs-content">
          {tabsData.map(({ id, component: TabComponent }) => (
            <>
              <TabContent id={id}>
                <TabComponent />
              </TabContent>
            </>
          ))}
        </div>
      </Tabs>

      <Button colorScheme="teal" aria-label="save changes" onClick={() => {}}>
        Save
      </Button>
    </div>
  );
}

export default EditSideBar;
