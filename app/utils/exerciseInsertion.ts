import { supabase } from "@/api"
import { validateAnswer } from "./answerValidation";

export const upsertExercise = async (exercise: any, answer: Array<string>, userAnswerId: string) => {
    console.log(userAnswerId)
    if (userAnswerId) {
        const { data, error } = await supabase
            .from('userAnswers')
            .update({
                'answer': answer,
                'points': [validateAnswer(exercise, answer), exercise.points],
                'answered_at': new Date()
            })
            .eq('id', userAnswerId)
            .select().single();
        return { data, error };
    } else {
        const { data, error } = await supabase
            .from('userAnswers')
            .insert({
                'exercise_id': exercise.exercise_id,
                'examType': exercise.test_type,
                'examSubject': exercise.subject,
                'type': exercise.type,
                'exerciseGroup': exercise.group,
                'answer': answer,
                'points': [validateAnswer(exercise, answer), exercise.points]
            })
            .select().single();
        return { data, error };
    }
}