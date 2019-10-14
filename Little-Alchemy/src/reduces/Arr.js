import actionTypes from '../const/actionTypes';
import _ from 'lodash'
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

      if (action.value.idDrop < 4) {
        state.Items = _.concat(state.Items,
          {
            id: state.Items.length,
            name: action.value.name,
            url: action.value.url,
          });
        state.Target = _.concat(state.Target,
          {
            id: state.Target.length,
            name: action.value.name,
            url: action.value.url,
            recipe: state.Items[action.value.idDrag].name + '+' + state.Target[action.value.idDrop].name
          })
      }
      else {
        state.Items = _.concat(state.Items,
          {
            id: state.Items.length,
            name: action.value.name,
            url: action.value.url,
          });
        _.fill(state.Target,
          {
            id: action.value.idDrop,
            name: action.value.name,
            url: action.value.url,
            recipe: state.Items[action.value.idDrag].name + '+' + state.Target[action.value.idDrop].name
          }
          , action.value.idDrop, action.value.idDrop + 1)
      }

      return state;
    default:
      return state;
  }
}

export default myReducer;