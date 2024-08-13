<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-4 ">Quiz Summary</h2>
    <SummaryChart :correct="correctAnswers" :incorrect="incorrectAnswers" />
    <p class="text-lg text-gray-600 mt-4">Correct Answers: <span class="font-semibold">{{ correctAnswers }}</span></p>
    <p class="text-lg text-gray-600">Incorrect Answers: <span class="font-semibold">{{ incorrectAnswers }}</span></p>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '../store/quiz';
import SummaryChart from '../components/SummaryChart/SummaryChart.vue'

const store = useQuizStore();

const correctAnswers = store.correctAnswersCount;
const incorrectAnswers = store.totalQuestions - correctAnswers;
</script>