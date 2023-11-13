// dynamic props - block id, block type, block data
// make getblock request
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { BlockClient } from "../../../api/BlockClient";
import { useStepEditorContext } from "../../pages/StepEditor/StepEditorContext";
import Tabs from "../Tabs/Tabs";
import { FormInput } from "../FormInput";

interface BlockEditorProps {
  // blockId: string;
  stepId: string;
}

export function BlockEditor({ stepId }: BlockEditorProps) {
  const stepEditorContext = useStepEditorContext();
  const block = stepEditorContext?.block;
  if (!block) return <></>;
  return (
    <>
      <div>
        {Object.keys(stepEditorContext?.block?.data ?? {}).map((key) => {
          return (
            <Flex alignItems="center" justifyContent="center">
              <FormLabel>{key}</FormLabel>
              <FormInput
                variant="outline"
                value={stepEditorContext?.block?.data[key]}
                onChange={(e) => {
                  stepEditorContext?.block &&
                    stepEditorContext?.setBlock({
                      ...stepEditorContext?.block,
                      data: {
                        ...stepEditorContext?.block?.data,
                        [key]: e.target.value,
                      },
                    });
                }}
              />
            </Flex>
          );
        })}
        {stepEditorContext?.block && (
          <Button
            onClick={() =>
              BlockClient.updateBlock({
                stepId,
                ...block,
              })
            }
          >
            Save
          </Button>
        )}
      </div>
    </>
  );
}
