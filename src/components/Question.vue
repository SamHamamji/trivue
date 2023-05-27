<script setup lang="ts">
import { ref } from "vue";

import { useQuizStore } from "@/stores/quiz";
import Answer from "@/components/Answer.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import type AnswerType from "@/types/AnswerType";

const quizStore = useQuizStore();

const selectedIndex = ref<number | null>(null);

function submitAnswer() {
  quizStore.selectedIndex = selectedIndex.value!
  console.log(`${quizStore.checkAnswer() ? "Right" : "Wrong"} answer`);
}

function nextQuestion() {
  selectedIndex.value = null;
  quizStore.nextQuestion();
}

function answerStatus(answerIndex: number): AnswerType {
  if (answerIndex === quizStore.currentQuestion?.correctIndex)
    return "success";
  if (answerIndex === quizStore.selectedIndex)
    return "error";
  return "info";
}

</script>

<template>
  <div v-if="quizStore.currentQuestion" class="card w-[32rem] max-w-[90%] bg-base-300 shadow-xl">
    <div class="card-body">
      <h2 class="card-title mb-2">{{ quizStore.currentQuestion.question.text }}</h2>
      <div class="flex flex-col gap-2">
        <div v-for="(answer, index) in quizStore.currentAnswers" :key="index">
          <div v-if="quizStore.selectedIndex === null" class="flex gap-2">
            <input type="radio" name="answer" :id="`radio-${index}`" class="radio radio-primary" :value="index" v-model="selectedIndex" />
            <label :for="`radio-${index}`">{{ answer }}</label>
          </div>
          <Answer v-else :answer="answer" :answer-type="answerStatus(index)" />
        </div>
      </div>
      <div class="card-actions justify-end">
        <button v-if="quizStore.selectedIndex === null" :class="`btn btn-primary ${selectedIndex === null ? 'btn-disabled' : ''}`" @click="submitAnswer">Submit</button>
        <button v-else class="btn btn-primary" @click="nextQuestion">Next question</button>
      </div>
    </div>
  </div>
  <div v-else-if="quizStore.isDone">No more questions</div>
  <LoadingIcon v-else />
</template>
