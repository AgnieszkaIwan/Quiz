<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <div v-if="!quizCompleted && currentQuestion">
      <Question 
        :question="currentQuestion"
        :questionIndex="currentQuestionIndex"
        :totalQuestions="questions.length"
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
import Question from '../components/Question/QuizQuestion.vue';

const store = useQuizStore();
const currentQuestionIndex = ref(0);
const quizCompleted = ref(false);

onMounted(async () => {
  await store.fetchQuestions();
});

const questions = computed(() => store.questions);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1);

const nextQuestion = () => {
  if (isLastQuestion.value) {
    quizCompleted.value = true;
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
</script>
