import * as actionTypes from '../actions/actionTypes';
import { defaultCipherList } from 'constants';

const initialState = {
    exercises: null
}

const getExercises = ( state = initialState, action) => {
    const exercises = action.exercises;
    return {
        ...state,
        ...exercises
    }
}

const reducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_EXERCISE: 
        return getExercises( state, action );
        default:
        return state
}
};

export default reducer;