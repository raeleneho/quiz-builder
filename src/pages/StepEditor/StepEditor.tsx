import { useParams } from "react-router-dom";

import { useState } from "react";
import StepClient, { Step, stepRoute } from "../../../api/StepClient";
import { useQuery } from "@tanstack/react-query";

import { BlockEditor } from "../../components/blocks/BlockEditor";
import StepPreview from "../../components/StepPreview";
import { StepEditorProvider } from "./StepEditorContext";
import Tabs from "../../components/Tabs/Tabs";
import Tab from "../../components/Tabs/TabTitle";
import { Divider, Flex } from "@chakra-ui/react";
import TabTitle from "../../components/Tabs/TabTitle";
import TabContent from "../../components/Tabs/TabContent";
import StepSettings from "../../components/StepSettings";
import { useTabsContext } from "../../components/Tabs/TabsContext";

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
    { id: "1", title: "Step Settings", component: <StepSettings /> },
    {
      id: "2",
      title: "Block Settings",
      component: <BlockEditor stepId={stepId ?? ""} />,
    },
    { id: "3", title: "Data" },
  ];

  return (
    <div>
      <StepEditorProvider stepId={stepId}>
        <>
          <StepPreview step={step} quizId={quizId ?? ""} />

          <Tabs>
            <Flex justify="flex-start" gap={1}>
              {tabsData.map((tab) => (
                <>
                  <TabTitle key={tab.id} {...tab} />
                </>
              ))}
            </Flex>
            <TabContent content={tabsData} />
          </Tabs>
          {/* <BlockEditor stepId={stepId ?? ""} /> */}
        </>
      </StepEditorProvider>
    </div>
  );
}

export default StepEditor;
