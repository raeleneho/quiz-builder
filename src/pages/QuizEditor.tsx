import { useParams } from "react-router-dom";
import QuizClient, { Quiz, quizRoute } from "../../api/QuizClient";
import { useQuery } from "@tanstack/react-query";
import { InputBlock } from "../blocks/InputBlock";
import { useState } from "react";
import { FormInput } from "../components/FormInput";

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
function QuizEditor() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>();

  const updateQuiz = (
    propertyName: keyof Quiz,
    value: Quiz[typeof propertyName]
  ) => {
    if (quiz) {
      setQuiz({
        ...quiz,
        [propertyName]: value,
      });
    }
  };

  const { data: quizRes } = useQuery({
    queryKey: [quizRoute, quizId],
    queryFn: async () => {
      const quiz = await QuizClient.getQuiz(quizId ?? "");
      setQuiz(quiz);
      return quiz;
    },
    enabled: !!quizId,
  });

  return (
    <Container centerContent p={6}>
      <HStack>
        <FormInput
          value={quiz?.name ?? ""}
          onChange={(e) => updateQuiz("name", e.target.value)}
        />

        <Button
          aria-label="update quiz"
          colorScheme="teal"
          fontSize="16px"
          size="sm"
          onClick={() => {
            if (quiz) {
              QuizClient.updateQuiz(quiz);
            }
          }}
        >
          save
        </Button>
      </HStack>
    </Container>
  );
}

export default QuizEditor;
