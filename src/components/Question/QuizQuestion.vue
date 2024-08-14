<template>
  <div class="question mb-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">
      {{ questionIndex + 1 }}. {{ decodedQuestion }}
    </h2>
    <ul class="space-y-2">
      <li v-for="(answer, index) in shuffledAnswers" :key="index">
        <label class="flex items-center space-x-2">
          <input type="radio" :value="answer" v-model="selectedAnswer" class="form-radio text-blue-600" />
          <span class="text-gray-700">{{ answer }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import { decodeHtmlEntities } from '../../utils'; // Adjust the path as necessary

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

// Props for the question component
const props = defineProps<{
  question: Question;
  questionIndex: number;
  totalQuestions: number;
}>();

// Emits event when an answer is selected
const emit = defineEmits(['answerSelected']);

// State for the selected answer
const selectedAnswer = ref('');

// Shuffle the answers (both correct and incorrect)
const shuffledAnswers = computed(() => {
  if (!props.question) return [];
  return [...props.question.incorrect_answers, props.question.correct_answer].sort(() => Math.random() - 0.5);
});

// Decode any HTML entities in the question text
const decodedQuestion = computed(() => props.question ? decodeHtmlEntities(props.question.question) : '');

// Watch for changes in the selected answer and emit an event when it changes
watch(selectedAnswer, (newAnswer) => {
  emit('answerSelected', { questionIndex: props.questionIndex, answer: newAnswer });
});

// Watch for changes in the question prop and reset selectedAnswer
watch(() => props.question, () => {
  selectedAnswer.value = ''; // Reset the selected answer when the question changes
}, { immediate: true });

</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>
