const getCountOfCorrectAnswers = (exercise: any, answer: Array<string>) => {
    let correctAnswers = 0;
    if (exercise.test_subject == "CJL") {
        for (let i = 0; i < exercise.correct_answer.length; i++)
            switch (exercise.type) {
                case "Výběr z možností":
                    if (answer[i] === exercise.correct_answer[i]) {
                        correctAnswers++;
                    } break;
                case "Výběr mezi ANO/NE":
                    if (answer[i] === exercise.correct_answer[i]) {
                        correctAnswers++;
                    } break;
                case "Textová odpověď":
                    if (answer.includes(exercise.correct_answer[i])) {
                        correctAnswers++;
                    } break;
                case "Přiřazení":
                    if (answer[i] === exercise.correct_answer[i]) {
                        correctAnswers++;
                    } break;
                case "Seřazení":
                    if (answer[i] === exercise.correct_answer[i]) {
                        correctAnswers++;
                    } break;
                case "Více textových odpovědí":
                    if (answer[i] === exercise.correct_answer[i]) {
                        correctAnswers++;
                    } break;
            }
    }
    return correctAnswers;
}

export const validateAnswer = (exercise: any, answer: Array<string>) => {
    if (exercise.test_subject == "CJL") {
        switch (exercise.type) {
            case "Textová odpověď":
                //0 z 4 = 0 - 4 = 4 + -4 = 0
                //1 z 4 = 1 - 4 = 4 + -3 = 1
                //2 z 4 = 2 - 4 = 4 + -2 = 2
                //3 z 4 = 3 - 4 = 4 + -1 = 3
                //4 z 4 = 4 - 4 = 4 + -0 = 4
                const countOfIncorrectAnswers = getCountOfCorrectAnswers(exercise, answer) - exercise.points;
                return (exercise.points + countOfIncorrectAnswers);
            case "Výběr mezi ANO/NE":
                switch (getCountOfCorrectAnswers(exercise, answer)) {
                    case 4: return exercise.points;
                    case 3: return 1;
                    default: return 0;
                }
            case "Seřazení":
                if (getCountOfCorrectAnswers(exercise, answer) == exercise.correct_answer.length) {
                    return exercise.points;
                } else return 0;
            case "Více textových odpovědí":
                return getCountOfCorrectAnswers(exercise, answer);
            case "Přiřazení":
                return getCountOfCorrectAnswers(exercise, answer);
            case "Výběr z možností":
                return getCountOfCorrectAnswers(exercise, answer);
        }
    }
}

export const getTestMaxPoints = (test, exercises) => {
    let maxPoints = 0;
    for (let i = 0; i < test.exerciseCount; i++) {
        maxPoints += exercises[i].points;
    }
    return maxPoints;
}

export const getTestTotalPoints = (test, exercises, answers) => {
    let totalPoints = 0;
    for (let i = 0; i < test.exerciseCount; i++) {
        totalPoints += validateAnswer(exercises[i], answers[i]);
    }
    return totalPoints;
}