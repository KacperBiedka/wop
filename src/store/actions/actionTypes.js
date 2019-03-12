
export const GET_EXERCISE = "GET_EXERCISE";

export let getExercises = ( exercises ) => {
    let reduxExercises = [];
    reduxExercises.push(exercises);
    return {
        type: GET_EXERCISE,
        exercises: {exercises}
    };
};