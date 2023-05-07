<script setup lang="ts">
import type Question from "@/types/Question";
import axios from "axios";
import { computed, ref } from "vue";

async function getQuestions(limit: number) {
  return (await axios.get<Question[]>('https://the-trivia-api.com/v2/questions', {
    params: {
      limit
    }
  })).data;
}

const questions = ref<Question[]>();
const currentQuestionIndex = ref(0);

const selectedAnswer = ref<string>();

const currentQuestion = computed(
  () => questions.value ? questions.value[currentQuestionIndex.value] : null,
);
const currentAnswers = computed(
  () => {
    if (!currentQuestion.value) return null;
    return [
      currentQuestion.value.correctAnswer,
      ...currentQuestion.value.incorrectAnswers
    ].sort(() => Math.random() - 0.5);
  }
);

getQuestions(5).then((data) => questions.value = data)
console.log(questions.value);

function submitAnswer() {
  if (selectedAnswer.value === currentQuestion.value?.correctAnswer) {
    console.log("Right answer");
  } else {
    console.log("Wrong answer");
  }
  currentQuestionIndex.value++;
}

</script>

<template>
  <div class="home">
    <div class="card w-96 bg-base-300 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ currentQuestion?.question.text }}</h2>
        <div>
          <div v-for="(answer, index) in currentAnswers" :key="index">
            <input type="radio" name="answer" :id="`radio-${index}`" class="radio radio-primary" :value="answer" v-model="selectedAnswer" />
            <label :for="`radio-${index}`">
              {{ answer }}
            </label>
          </div>
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" :class="selectedAnswer === undefined ? 'btn-disabled' : ''" @click="submitAnswer">Submit</button>
        </div>
      </div>
    </div>
    <RouterLink class="btn" to="/">Home</RouterLink>
  </div>
</template>
