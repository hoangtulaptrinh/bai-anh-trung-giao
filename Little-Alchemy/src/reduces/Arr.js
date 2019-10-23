import actionTypes from '../const/actionTypes';

var initialState = {
  Items: [],
  Target: []
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_DATA:
      return action.obj.data;

    case actionTypes.FOLLOW_RECIPE:

      return state;

    default:
      return state;
  }
}

export default myReducer;