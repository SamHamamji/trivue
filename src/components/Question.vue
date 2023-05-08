<script setup lang="ts">
import type Question from '@/types/Question';
import { computed, ref } from "vue";

const props = defineProps<{
  question: Question
}>();

const currentAnswers = computed(
  () => [
    props.question.correctAnswer,
    ...props.question.incorrectAnswers
  ].sort(() => Math.random() - 0.5)
);

const selectedAnswer = ref<string>();

function submitAnswer() {
  if (selectedAnswer.value === props.question.correctAnswer) {
    console.log("Right answer");
  } else {
    console.log("Wrong answer");
  }
}
</script>

<template>
  <div class="card w-96 bg-base-300 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ question.question.text }}</h2>
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
</template>
