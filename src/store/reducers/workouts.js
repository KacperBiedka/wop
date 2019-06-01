import * as actionTypes from "../actions/actionTypes";

const initialState = {
  exercises: null,
  number: null,
  workoutsNumber: null,
  timers: []
};

const getExercises = (state = initialState, action) => {
  const exercises = action.exercises;
  const number = action.number;
  const timers = action.timers;
  return {
    ...state,
    ...exercises,
    number,
    timers
  };
};

const getWorkoutsNumber = (state = initialState, action) => {
  const workoutsNumber = action.workoutsNumber;
  return {
    ...state,
    workoutsNumber
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NUMBER:
      return getWorkoutsNumber(state, action);
    case actionTypes.GET_EXERCISE:
      return getExercises(state, action);
    default:
      return state;
  }
};

export default reducer;
