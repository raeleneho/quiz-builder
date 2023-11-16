import { useParams } from "react-router-dom";

import { useState } from "react";
import StepClient, { Step, stepRoute } from "../../../api/StepClient";
import { useQuery } from "@tanstack/react-query";

import { BlockEditor } from "../../components/blocks/BlockEditor";
import StepPreview from "../../components/StepPreview";
import { StepEditorProvider } from "./StepEditorContext";
import Tabs from "../../components/Tabs/Tabs";

import { Box, Divider, Flex, HStack } from "@chakra-ui/react";
import TabTitle from "../../components/Tabs/TabTitle";
import TabContent from "../../components/Tabs/TabContent";
import StepSettings from "../../components/StepSettings";
import { useTabsContext } from "../../components/Tabs/TabsContext";
import Tab from "../../components/Tabs/Tab";

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

  const tabsData = [
    {
      id: "1",
      title: "Step Settings",
      component: () => {
        <StepSettings />;
      },
    },
    {
      id: "2",
      title: "Block Settings",
      component: () => <BlockEditor stepId={stepId ?? ""} />,
    },
    { id: "3", title: "Data" },
  ];

  return (
    <Box w="100%">
      <StepEditorProvider stepId={stepId}>
        <>
          <StepPreview step={step} quizId={quizId ?? ""} />

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
                <TabContent id={id}>{TabComponent}</TabContent>
              </>
            ))}
          </Tabs>
        </>
      </StepEditorProvider>
    </Box>
  );
}

export default StepEditor;
