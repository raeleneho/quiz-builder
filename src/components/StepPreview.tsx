import { useQueries } from "@tanstack/react-query";
import { Block, BlockClient, blockRoute } from "../../api/BlockClient";
import { Step } from "../../api/StepClient";

// import { BlockRenderer } from "../pages/StepEditor";
import { BlockInserter } from "./BlockInserter";

import { blockLibrary } from "./blocks/BlockLibrary";
import { useStepEditorContext } from "../pages/StepEditor/StepEditorContext";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";

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
            return BlockClient.getBlock({ blockId, stepId: step?.id ?? "" });
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
            <VStack>
              <Box
                color="white"
                className={`${
                  stepEditorContext?.selectedBlockId === block?.id
                    ? "content-block-hightlight"
                    : ""
                }`}
                onClick={() =>
                  stepEditorContext?.setSelectedBlockId(block?.id ?? "")
                }
              >
             

                <BlockRenderer
                  block={isSelected ? stepEditorContext?.block : block}
                  isSelected={isSelected}
                />
              
              </Box>
              <BlockInserter
                position={index}
                stepId={step?.id ?? ""}
                quizId={quizId ?? ""}
              />
            </VStack>
          </>
        );
      })}
    </>
  );
}

export default StepPreview;
