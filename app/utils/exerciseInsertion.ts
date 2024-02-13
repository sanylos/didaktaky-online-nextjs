import { supabase } from "@/api"

export const upsertExercise = async (exercise: any, answer: Array<string>, isAnswered: boolean, userAnswerId: string) => {
    const { data, error } = await supabase
        .from('userAnswers')
        .upsert({
            'id': userAnswerId && userAnswerId,
            'exercise_id': exercise.exercise_id,
            'examType': exercise.test_type,
            'examSubject': exercise.subject,
            'exerciseType': exercise.type,
            'exerciseGroup': exercise.group,
            'answer': answer,
            'answered_at': isAnswered ? new Date() : null,
        })
        .select().single();
    return { data, error };
}