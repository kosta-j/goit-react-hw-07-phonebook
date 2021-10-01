import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, changeFilter } from './actions';

const contactItemsReducer = createReducer([], {
  [addContact]: addContactCallback,
  [deleteContact]: deleteContactCallback,
});

const contactFilterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items: contactItemsReducer,
  filter: contactFilterReducer,
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
