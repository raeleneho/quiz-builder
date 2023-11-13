import { NavLink } from "react-router-dom";
import QuizClient, { Quiz, quizRoute } from "../../api/QuizClient";
import StepClient, { stepRoute } from "../../api/StepClient";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BlockClient, BlockType } from "../../api/BlockClient";
import { blockLibrary } from "./blocks/BlockLibrary";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ChevronRightIcon,
  SmallAddIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

function SideBar() {
  const { data: quizzes } = useQuery({
    queryKey: [quizRoute],
    queryFn: async () => {
      return QuizClient.getQuizzes();
    },
    placeholderData: keepPreviousData,
  });

  const generateQuiz = () => {
    const newQuiz = { name: "new quiz", steps: [] };

    QuizClient.createQuiz(newQuiz);
  };

  return (
    <>
      <div className="side-bar">
        <Button
          variant="outline"
          borderColor={"teal.500"}
          onClick={() => generateQuiz()}
        >
          + Add a quiz!
        </Button>
        {quizzes?.map?.((quiz) => (
          <QuizSideBarItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </>
  );
}

function QuizSideBarItem({ quiz }: { quiz: Quiz }) {
  const deleteQuiz = (quiz: Quiz) => {
    QuizClient.deleteQuiz(quiz.id);
  };

  const updateQuiz = (quiz: Quiz) => {
    const newName = prompt("Please enter new name", quiz.name) ?? quiz.name;
    QuizClient.updateQuiz({
      ...quiz,
      name: newName,
    });
  };

  const addStep = (quiz: Quiz) => {
    const newStep = {
      quizId: quiz.id,
      name: "new step",
    };
    StepClient.createStep(newStep);
  };

  return (
    <VStack align="stretch" pt={2} spacing={3}>
      <Flex>
        <Button colorScheme="teal" variant="link">
          <NavLink to={`/quizzes/${quiz.id}/`}>{quiz.name}</NavLink>
        </Button>
        <Spacer />
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <IconButton
            colorScheme="teal"
            fontSize="16px"
            variant="outline"
            size="sm"
            onClick={() => deleteQuiz(quiz)}
            aria-label="delete quix"
            icon={<DeleteIcon />}
          ></IconButton>

          <IconButton
            aria-label="update quiz"
            colorScheme="teal"
            variant="outline"
            fontSize="16px"
            size="sm"
            onClick={() => updateQuiz(quiz)}
          >
            <EditIcon />
          </IconButton>
          <Button
            aria-label="add step"
            colorScheme="teal"
            fontSize="16px"
            size="sm"
            onClick={() => addStep(quiz)}
          >
            <SmallAddIcon />
            Add a step
          </Button>
        </Flex>
      </Flex>

      {quiz.steps.map((stepId: string) => (
        <StepSideBarItem key={stepId} stepId={stepId} quiz={quiz} />
      ))}
    </VStack>
  );
}

function StepSideBarItem({ stepId, quiz }: { stepId: string; quiz: Quiz }) {
  const { data: step } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      return StepClient.getStep({
        quizId: quiz.id,
        stepId: stepId,
      });
    },
  });

  const [showStepOptions, setShowStepOptions] = useState(false);
  const showStepToggle = () => {
    setShowStepOptions(!showStepOptions);
    console.log(showStepOptions);
  };

  const deleteStep = (quiz: Quiz, stepId: string) => {
    StepClient.deleteStep({
      quizId: quiz.id,
      stepId: stepId,
    });
  };

  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId: quiz.id,
      stepId: stepId,
      type: blockType,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  return (
    <div>
      <Flex>
        <Button
          colorScheme="teal"
          variant="link"
          onClick={() => showStepToggle()}
        >
          {showStepOptions ? (
            <ChevronDownIcon mr={1} />
          ) : (
            <ChevronRightIcon mr={1} />
          )}

          <NavLink to={`/quizzes/${quiz.id}/steps/${stepId}`}>
            {" "}
            {step?.name}
          </NavLink>
        </Button>
        <Spacer />
        <IconButton
          colorScheme="teal"
          fontSize="16px"
          variant="outline"
          size="sm"
          aria-label="delete step"
          onClick={() => deleteStep(quiz, stepId)}
          icon={<DeleteIcon />}
        ></IconButton>
      </Flex>
      <Flex pl={4} alignItems="center" gap="2">
        {showStepOptions && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => addBlock(BlockType.INPUT)}
            >
              {BlockType.INPUT}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => addBlock(BlockType.TEXTAREA)}
            >
              {BlockType.TEXTAREA}
            </Button>{" "}
          </>
        )}
      </Flex>
    </div>
  );
}

export default SideBar;
