import { combineReducers } from 'redux';

import IdDrop from './IdDrop'
import Arr from './Arr'

const myReducer = combineReducers({
  IdDrop : IdDrop,
  Arr : Arr,
});

export default myReducer;