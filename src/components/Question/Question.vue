<template>
  <div class="question">
    <h2>{{ question.question }}</h2>
    <ul>
      <li v-for="(answer, index) in shuffledAnswers" :key="index">
        <label>
          <input type="radio" :value="answer" v-model="selectedAnswer" />
          {{ answer }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';

const props = defineProps({
  question: Object,
  questionIndex: Number,
  totalQuestions: Number
});

const selectedAnswer = ref('');

const shuffledAnswers = computed(() => {
  return [...props.question.incorrect_answers, props.question.correct_answer].sort(() => Math.random() - 0.5);
});

watch(selectedAnswer, (newAnswer) => {
  // Emituj wydarzenie z zaznaczoną odpowiedzią
});
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>