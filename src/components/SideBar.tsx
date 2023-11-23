import { NavLink } from 'react-router-dom';
import QuizClient, { Quiz, quizRoute } from '../../api/QuizClient';
import StepClient, { stepRoute } from '../../api/StepClient';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BlockClient, BlockType } from '../../api/BlockClient';
import { blockLibrary } from './blocks/BlockLibrary';
import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack, useMediaQuery } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronRightIcon, SmallAddIcon, ChevronDownIcon } from '@chakra-ui/icons';

function SideBar() {
  const { data: quizzes } = useQuery({
    queryKey: [quizRoute],
    queryFn: async () => {
      return QuizClient.getQuizzes();
    },
    placeholderData: keepPreviousData,
  });

  const generateQuiz = () => {
    const newQuiz = { name: 'new quiz', steps: [] };

    QuizClient.createQuiz(newQuiz);
  };

  return (
    <>
      <div className="sidebar left-sidebar">
        <Button variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
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
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  const deleteQuiz = (quiz: Quiz) => {
    QuizClient.deleteQuiz(quiz.id);
  };

  const updateQuiz = (quiz: Quiz) => {
    const newName = prompt('Please enter new name', quiz.name) ?? quiz.name;
    QuizClient.updateQuiz({
      ...quiz,
      name: newName,
    });
  };

  const addStep = (quiz: Quiz) => {
    const newStep = {
      quizId: quiz.id,
      name: 'new step',
    };
    StepClient.createStep(newStep);
  };

  return (
    <VStack align="stretch" spacing={3}>
      <Flex>
        <Button pr={2} colorScheme="teal" variant="link">
          <NavLink to={`/quizzes/${quiz.id}/`}>{quiz.name}</NavLink>
        </Button>
        <Spacer />
        {isLargerThan1024 ? (
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <IconButton
              colorScheme="teal"
              fontSize="16px"
              variant="outline"
              size="sm"
              onClick={() => deleteQuiz(quiz)}
              aria-label="delete quiz"
              icon={<DeleteIcon />}
            ></IconButton>

            <IconButton aria-label="update quiz" colorScheme="teal" variant="outline" fontSize="16px" size="sm" onClick={() => updateQuiz(quiz)}>
              <EditIcon />
            </IconButton>
            <Button aria-label="add step" colorScheme="teal" fontSize="16px" size="sm" onClick={() => addStep(quiz)}>
              <SmallAddIcon />
              Add a step
            </Button>
          </Flex>
        ) : (
          <Menu>
            <MenuButton as={Button} size="sm" colorScheme="teal" rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => deleteQuiz(quiz)}>Delete quiz</MenuItem>
              <MenuItem onClick={() => updateQuiz(quiz)}>Edit quiz</MenuItem>
              <MenuItem onClick={() => addStep(quiz)}>Add a step</MenuItem>
            </MenuList>
          </Menu>
        )}
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

  const deleteStep = (quiz: Quiz, stepId: string) => {
    StepClient.deleteStep({
      quizId: quiz.id,
      stepId: stepId,
    });
  };

  return (
    <div>
      <Flex align="center">
        <ChevronRightIcon mr={1} />

        <NavLink to={`/quizzes/${quiz.id}/steps/${stepId}`}> {step?.name}</NavLink>

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
    </div>
  );
}

export default SideBar;
