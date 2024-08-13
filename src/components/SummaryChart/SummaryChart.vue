<template>
  <div class="p-4">
    <Bar :data="data" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import type { ChartOptions, ChartData } from 'chart.js';

// Registration of components Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  correct: number;
  incorrect: number;
}>();

const data = computed<ChartData<'bar'>>(() => ({
  labels: ['Correct', 'Incorrect'],
  datasets: [
    {
      label: 'Answers',
      backgroundColor: ['#008080', '#AFEEEE'],
      data: [props.correct, props.incorrect],
    },
  ],
}));

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
 
  },
};
</script>