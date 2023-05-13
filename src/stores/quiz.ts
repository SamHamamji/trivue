import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type Question from "@/types/Question";

async function getQuestions(limit: number) {
    return (await axios.get<Question[]>(
        'https://the-trivia-api.com/v2/questions',
        { params: { limit } },
    )).data;
}

export const useQuizStore = defineStore('tasks', () => {
    const quiz = ref<Question[]>([]);
    const currentQuestionIndex = ref(0);
    const currentQuestion = computed<Question | null>(
        () => quiz.value ? quiz.value[currentQuestionIndex.value] : null,
    );
    const currentAnswers = computed(
        () => (currentQuestion.value)
            ? [
                currentQuestion.value.correctAnswer,
                ...currentQuestion.value.incorrectAnswers,
            ].sort(() => Math.random() - 0.5) : null
    );

    const requestQuiz = async (length: number) => {
        quiz.value = [];
        quiz.value = await getQuestions(length);
        currentQuestionIndex.value = 0;
    }

    const nextQuestion = () => { currentQuestionIndex.value++ };
    const checkCurrentAnswer = (answer: string) => answer === currentQuestion.value?.correctAnswer;

    return {
        quiz,
        checkCurrentAnswer,
        currentAnswers,
        currentQuestionIndex,
        currentQuestion,
        nextQuestion,
        requestQuiz,
    };
})
