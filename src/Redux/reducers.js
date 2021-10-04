import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContact,
  changeFilter,
} from './actions';

const contactItemsReducer = createReducer([], {
  [addContactSuccess]: addContactCallback,
  [deleteContact]: deleteContactCallback,
});

const contactFilterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const contactsLoadingReducer = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
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
  return state.filter(item => item.id !== payload.id);
}

export default contactsReducer;
