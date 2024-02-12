import { supabase } from "@/api"
export const upsertExercise = async (exercise: any) => {
    const { data, error } = await supabase
        .from('userAnswers')
        .insert({
            'exercise_id': exercise.exercise_id,
            'examType': exercise.test_type,
            'examSubject': exercise.subject,
            'exerciseType': exercise.type,
            'exerciseGroup': exercise.group,
        })
        .select().single();
    return { data, error };
}