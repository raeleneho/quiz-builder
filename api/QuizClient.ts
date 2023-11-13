
import  api from './localStorageApi';
import { queryClient } from '../src/library/QueryClient';

export interface Quiz {
  id: string;
  name: string;
  age: number;
  steps: string[]
}

interface CreateQuizRequest {
  name: string;
}

interface UpdateQuizRequest {
  id: string;
  name: string;
  steps: string[]
}

export const quizRoute = 'quizzes'

export const  createQuiz = async (request: CreateQuizRequest) => { 
  const data =  {
    name: request.name,
    steps: [],
  }

  const res = await api.post<CreateQuizRequest, Quiz>(`/${quizRoute}`, data)

  
  queryClient.invalidateQueries({queryKey: [quizRoute]})

  return res
}

export const getQuiz = async (id: string) => {
  const result = await api.get<Quiz>(`/${quizRoute}/${id}`)
  return result
}
export const getQuizzes = async () => { 
  return await api.get_all<Quiz>(`/${quizRoute}`)
}

export const deleteQuiz = async (id: string) => { 
  const res = await api.delete(`/${quizRoute}/${id}`)
  queryClient.invalidateQueries({queryKey: [quizRoute]})
  return res
}

export const updateQuiz = async (request: UpdateQuizRequest) => {
  const res = api.update<UpdateQuizRequest, Quiz>(`/${quizRoute}/${request.id}`, request)
  queryClient.invalidateQueries({queryKey: [quizRoute]})
  return res
}

export default {
  createQuiz,
  getQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz

}