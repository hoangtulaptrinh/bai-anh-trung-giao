import { combineReducers } from 'redux';

import IdDrop from './IdDrop'
import Arr from './Arr'
import NewItems from './NewITems'

const myReducer = combineReducers({
  IdDrop: IdDrop,
  Arr: Arr,
  NewItems: NewItems
});

export default myReducer;