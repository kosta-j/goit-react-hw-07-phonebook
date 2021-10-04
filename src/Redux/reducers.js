import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  changeFilter,
  deleteContactError,
  deleteContactRequest,
  deleteContactSuccess,
  fetchContactError,
  fetchContactRequest,
  fetchContactSuccess,
} from './actions';

const contactItemsReducer = createReducer([], {
  [fetchContactSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: addContactCallback,
  [deleteContactSuccess]: deleteContactCallback,
});

const contactFilterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const contactsLoadingReducer = createReducer(false, {
  [fetchContactRequest]: () => true,
  [fetchContactSuccess]: () => false,
  [fetchContactError]: () => false,
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
});

const contactsReducer = combineReducers({
  items: contactItemsReducer,
  filter: contactFilterReducer,
  loading: contactsLoadingReducer,
});

function addContactCallback(state, { payload }) {
  //duplicated name check:
  if (state.filter(item => item.name === payload.name).length > 0) {
    alert(`${payload.name} is already in contacts`);
    return state;
  }
  return [...state, payload];
}

function deleteContactCallback(state, { payload }) {
  return state.filter(item => item.id !== payload);
}

export default contactsReducer;
