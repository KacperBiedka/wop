
export const GET_EXERCISE = "GET_EXERCISE";

export let getExercises = ( exercises, number ) => {
    return {
        type: GET_EXERCISE,
        exercises: {exercises},
        number: number
    };
};