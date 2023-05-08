<script setup lang="ts">
import type Question from "@/types/Question";
import axios from "axios";
import { computed, ref } from "vue";
import QuestionComponent from "../components/Question.vue";

async function getQuestions(limit: number) {
  return (await axios.get<Question[]>('https://the-trivia-api.com/v2/questions', {
    params: { limit }
  })).data;
}

const questions = ref<Question[]>();
getQuestions(5).then((data) => questions.value = data);

const currentQuestionIndex = ref(0);
const currentQuestion = computed(
  () => questions.value ? questions.value[currentQuestionIndex.value] : null,
);

</script>

<template>
  <div class="home">
    <QuestionComponent v-if="currentQuestion" :question="currentQuestion" />
    <div v-else class="loading-icon" />
    <RouterLink class="btn" to="/">Home</RouterLink>
  </div>
</template>

<style>
.loading-icon {
  width: 50px;
  height: 50px;
  border: 6px solid hsl(var(--p));
  border-bottom-color: #fff0;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>