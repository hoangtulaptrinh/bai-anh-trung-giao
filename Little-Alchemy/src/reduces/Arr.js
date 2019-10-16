import actionTypes from '../const/actionTypes';
var initialState = {
  Items: [],
  Target: []
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_DATA:
      return action.obj.data;

    case actionTypes.RESET:
      return {
        Items: state.Items,
        Target: initialState.Target
      }

    case actionTypes.HARD_RESET:
      return initialState;

    case actionTypes.REMOVE_DUPLICATE:
      const ids = new Set();
      const newItems = state.Items.filter(e => {
        if (ids.has(e.name)) {
          return false;
        } else {
          ids.add(e.name);
          return true;
        }
      });
      return {
        Items: [...newItems],
        Target: state.Target,
      }

    case actionTypes.FOLLOW_RECIPE:

      return state;
      
    default:
      return state;
  }
}

export default myReducer;