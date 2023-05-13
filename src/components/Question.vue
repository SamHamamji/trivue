<script setup lang="ts">
import { useQuizStore } from '@/stores/quiz';
import { ref } from "vue";

const quizStore = useQuizStore();

const selectedAnswer = ref<string>();

function submitAnswer() {
  if (quizStore.checkCurrentAnswer(selectedAnswer.value!)) {
    console.log("Right answer");
  } else {
    console.log("Wrong answer");
  }
  quizStore.nextQuestion();
}
</script>

<template>
  <div v-if="quizStore.currentQuestion" class="card w-96 max-w-[90%] bg-base-300 shadow-xl">
    <div class="card-body">
      <h2 class="card-title mb-2">{{ quizStore.currentQuestion.question.text }}</h2>
      <div class="flex flex-col gap-2">
        <div v-for="(answer, index) in quizStore.currentAnswers" :key="index" class="flex gap-2">
          <input type="radio" name="answer" :id="`radio-${index}`" class="radio radio-primary" :value="answer" v-model="selectedAnswer" />
          <label :for="`radio-${index}`">{{ answer }}</label>
        </div>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" :class="selectedAnswer === undefined ? 'btn-disabled' : ''" @click="submitAnswer">Submit</button>
      </div>
    </div>
  </div>
  <div v-else class="loading-icon mx-auto" />
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
