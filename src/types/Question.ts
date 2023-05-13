type APIQuestion = {
    category: Category;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: { text: string };
    tags: string[];
    type: Type;
    difficulty: Difficulty;
    regions: string[];
    isNiche: boolean;
}

type Question = {
    category: Category;
    id: string;
    correctIndex: number;
    answers: string[];
    question: { text: string };
    tags: string[];
    type: Type;
    difficulty: Difficulty;
    regions: string[];
    isNiche: boolean;
}

enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

enum Category {
    Music = "music",
    SportAndLeisure = "sport_and_leisure",
    FilmAndTv = "film_and_tv",
    ArtsAndLiterature = "arts_and_literature",
    History = "history",
    SocietyAndCulture = "society_and_culture",
    Science = "science",
    Geography = "geography",
    FoodAndDrink = "food_and_drink",
    GeneralKnowledge = "general_knowledge",
}

enum Type {
    TextChoice = "text_choice",
}

export type { APIQuestion, Question };
