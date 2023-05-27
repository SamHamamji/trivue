import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { APIQuestion, Question } from "@/types/Question";

async function getQuestions(limit: number) {
    return (await axios.get<APIQuestion[]>(
        'https://the-trivia-api.com/v2/questions',
        { params: { limit } },
    )).data.map<Question>((question) => {
        const answers = [
            ...question.incorrectAnswers,
            question.correctAnswer,
        ].sort(() => Math.random() - 0.5);
        const newQuestion: Question & {
            [K in keyof APIQuestion]: K extends keyof Question
            ? APIQuestion[K]
            : APIQuestion[K] | undefined;
        } = {
            ...question,
            answers,
            correctIndex: answers.findIndex((answer) => answer === question.correctAnswer),
        };
        delete newQuestion.correctAnswer;
        delete newQuestion.incorrectAnswers;
        return newQuestion;
    });
}

export const useQuizStore = defineStore('tasks', () => {
    const quiz = ref<Question[]>([]);
    const currentQuestionIndex = ref(0);
    const currentQuestion = computed<Question | null>(
        () => quiz.value ? quiz.value[currentQuestionIndex.value] : null,
    );
    const currentAnswers = computed(() => currentQuestion.value?.answers ?? null);
    const selectedIndex = ref<number | null>(null);

    const isDone = computed(
        () => currentQuestionIndex.value >= quiz.value.length
    );

    const requestQuiz = async (length: number) => {
        quiz.value = [];
        quiz.value = await getQuestions(length);
        currentQuestionIndex.value = 0;
        selectedIndex.value = null;
    };

    const nextQuestion = () => {
        currentQuestionIndex.value++;
        selectedIndex.value = null;
    };
    const checkAnswer = () => selectedIndex.value === currentQuestion.value?.correctIndex;

    return {
        quiz,
        checkAnswer,
        currentAnswers,
        currentQuestionIndex,
        currentQuestion,
        isDone,
        nextQuestion,
        requestQuiz,
        selectedIndex,
    };
})
