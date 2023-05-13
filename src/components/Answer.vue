<script setup lang="ts">
import type AnswerType from '@/types/AnswerType';

const alerts = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  info: '',
} as const;

const props = defineProps<{
  answer: string;
  answerType: AnswerType;
}>();

</script>

<template>
  <div class="alert shadow-lg w-full justify-between" :class="`alert-${props.answerType}`">
    <span>{{ answer }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="alerts[answerType]" />
    </svg>
  </div>
</template>
