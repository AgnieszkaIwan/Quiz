<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="text-center">
      <img src="@/assets/images/brain.jpg" alt="Quiz Time" class="w-full max-w-2xl mx-auto mb-6" />
      <h2 class="text-4xl font-bold text-gray-900 mb-4">Welcome to the Quiz App!</h2>
      <p class="text-lg text-gray-700 mb-6">
        Test your knowledge and challenge yourself with various quizzes on different topics.
      </p>
      <router-link to="/quiz" class="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
        Start Quiz
      </router-link>
    </div>
  </main>
</template>

<style scoped>
body {
  background-color: #f5f5f5; /* Light gray background */
}
</style>