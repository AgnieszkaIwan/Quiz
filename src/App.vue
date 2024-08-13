<template>
  <header class="bg-gray-900 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold">Quiz App!</h1>
      <nav class="flex space-x-6">
        <RouterLink
          to="/"
          class="text-lg hover:text-gray-300 transition duration-300"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/quiz"
          class="text-lg hover:text-gray-300 transition duration-300"
        >
          Quiz
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>