export const GET_EXERCISE = "GET_EXERCISE";
export const GET_NUMBER = "GET_NUMBER";

export const getExercises = (exercises, number) => {
  return {
    type: GET_EXERCISE,
    exercises: { exercises },
    number: number
  };
};

export const getWorkoutsNumber = number => {
  return {
    type: GET_NUMBER,
    workoutsNumber: number
  };
};
