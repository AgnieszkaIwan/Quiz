<template>
  <div>
    <div v-if="!quizCompleted && currentQuestion">
      <Question 
        :question="currentQuestion"
        :questionIndex="currentQuestionIndex"
        :totalQuestions="questions.length"
      />
      <button @click="prevQuestion" :disabled="currentQuestionIndex === 0">Poprzednie</button>
      <button @click="nextQuestion">{{ isLastQuestion ? 'Zakończ' : 'Następne' }}</button>
    </div>
    <div v-else>
      <router-link to="/summary">Zobacz podsumowanie</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuizStore } from '@/store/quiz';
import Question from '../components/Question/Question.vue';

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
