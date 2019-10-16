import actionTypes from '../const/actionTypes';

export const reset = () => { return { type: actionTypes.RESET } }

export const hardReset = () => { return { type: actionTypes.HARD_RESET } }

export const updateID = (value) => { return { type: actionTypes.UPDATE_ID, value: value } }

export const followRecipe = (value) => { return { type: actionTypes.FOLLOW_RECIPE, value: value } }

export const remove_duplicate = () => { return { type: actionTypes.REMOVE_DUPLICATE } }

export const FETCH_DATA = (obj) => { return { type: actionTypes.FETCH_DATA, obj: obj } }

export const createNewItems = (value) => { return { type: actionTypes.CREATE_NEW_ITEMS, value: value } }