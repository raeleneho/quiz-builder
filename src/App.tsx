import "./App.css";

// import { ReactQueryDevtools } from "react-query-devtools";
import { Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import { queryClient } from "./library/QueryClient";
import QuizEditor from "./pages/QuizEditor";
import StepEditor from "./pages/StepEditor/StepEditor";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ReactQueryDevtools initialIsOpen={false} />

          <SideBar />
          <Routes>
            <Route path="/quizzes/:quizId" element={<QuizEditor />} />
            <Route
              path="/quizzes/:quizId/steps/:stepId"
              element={<StepEditor />}
            />
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
