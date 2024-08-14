import { defineStore } from 'pinia';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizState {
  questions: Question[];
  answers: Record<number, string>;
  completed: boolean;
  loading: boolean;
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [],
    answers: {},
    completed: false,
    loading: false,
  }),
  actions: {
    async fetchQuestions() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        this.questions = data.results.map((question: any) => ({
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
        }));
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      } finally {
        this.loading = false;
      }
    },
    setAnswer(questionIndex: number, answer: string) {
      this.answers[questionIndex] = answer;
    },
    finishQuiz() {
      this.completed = true;
    },
  },
  getters: {
    correctAnswersCount: (state) => {
      return state.questions.reduce((count, question, index) => {
        return count + (state.answers[index] === question.correct_answer ? 1 : 0);
      }, 0);
    },
    totalQuestions: (state) => state.questions.length,
  },
});