<template>
  <div>
    <h2>Quiz Summary</h2>
    <SummaryChart :correct="correctAnswers" :incorrect="incorrectAnswers" />
    <p>Correct Answers: {{ correctAnswers }}</p>
    <p>Incorrect Answers: {{ incorrectAnswers }}</p>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '../store/quiz';
import SummaryChart from '../components/SummaryChart/SummaryChart.vue'

const store = useQuizStore();

const correctAnswers = store.correctAnswersCount;
const incorrectAnswers = store.totalQuestions - correctAnswers;
</script>