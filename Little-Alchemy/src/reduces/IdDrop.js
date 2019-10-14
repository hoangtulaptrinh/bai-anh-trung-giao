import actionTypes from '../const/actionTypes';

var initialState = 0

  var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ID:
          return action.value.idDrop;
        default:
          return state
    }
}

export default myReducer;