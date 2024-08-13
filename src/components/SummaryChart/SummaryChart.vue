<template>
  <div>
    <Bar :data="data" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
    ChartOptions, 
} from 'chart.js';

// Registration of components Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  correct: Number,
  incorrect: Number,
});

const data = ref({
  labels: ['Correct', 'Incorrect'],
  datasets: [
    {
      label: 'Answers',
      backgroundColor: ['#42A5F5', '#FF6384'],
      data: [props.correct, props.incorrect],
    },
  ],
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Quiz Summary',
    },
  },
};
</script>