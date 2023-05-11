<script setup lang="ts">
import QuestionComponent from "@/components/Question.vue";
import { useQuizStore } from "@/stores/quiz";

const quizStore = useQuizStore();
quizStore.requestQuiz(3);
</script>

<template>
  <div class="flex flex-col content-center justify-start gap-10 p-5 flex-wrap">
    <QuestionComponent />
    <RouterLink class="btn" to="/">Home</RouterLink>
  </div>
</template>
