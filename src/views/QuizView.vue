<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <div v-if="!quizCompleted && currentQuestion">
      <Question 
        v-if="decodedCurrentQuestion"
        :question="decodedCurrentQuestion"
        :questionIndex="currentQuestionIndex"
        :totalQuestions="questions.length"
        @answerSelected="handleAnswerSelected"
      />
      <div class="flex justify-between mt-4">
        <button @click="prevQuestion" :disabled="currentQuestionIndex === 0" class="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50">Previous</button>
        <button @click="nextQuestion" class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300">{{ isLastQuestion ? 'Finish' : 'Next' }}</button>
      </div>
    </div>
    <div v-else class="text-center">
      <router-link to="/summary" class="text-blue-500 hover:underline">View Summary</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuizStore } from '@/store/quiz'; 
import Question from '@/components/Question/QuizQuestion.vue'; 
import { decodeHtmlEntities } from '../utils'; 

const store = useQuizStore();
const currentQuestionIndex = ref(0);
const quizCompleted = computed(() => store.completed); 
const questions = computed(() => store.questions);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);


const decodedCurrentQuestion = computed(() => {
  if (!currentQuestion.value) return null;
  return {
    ...currentQuestion.value,
    question: decodeHtmlEntities(currentQuestion.value.question),
    correct_answer: decodeHtmlEntities(currentQuestion.value.correct_answer),
    incorrect_answers: currentQuestion.value.incorrect_answers.map(decodeHtmlEntities),
  };
});

const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

onMounted(async () => {
  await store.fetchQuestions();
});

const nextQuestion = () => {
  if (isLastQuestion.value) {
    store.finishQuiz();
  } else {
    currentQuestionIndex.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const handleAnswerSelected = (payload: { questionIndex: number; answer: string }) => {
  store.setAnswer(payload.questionIndex, payload.answer);
};
</script>