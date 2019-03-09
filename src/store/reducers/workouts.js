import * as actionTypes from '../actions/actionTypes';

const initialState = {
    exercise: null
}


const reducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_EXERCISE: 
        const exercise = action.exercise
        return {
            ...state,
            exercise: exercise 
        }
    }
};

export default reducer;