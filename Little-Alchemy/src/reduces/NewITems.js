import actionTypes from '../const/actionTypes';
var initialState = {
  name: '',
  url: ''
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.CREATE_NEW_ITEMS:
      return {
        name: action.value.name,
        url: action.value.url
      };

    default:
      return state;
  }
}

export default myReducer;