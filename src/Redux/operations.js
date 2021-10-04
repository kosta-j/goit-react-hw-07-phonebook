import axios from 'axios';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
} from './actions';

axios.defaults.baseURL = 'http://localhost:3001';

export const addContact =
  ({ name, number }) =>
  dispatch => {
    const contact = {
      name,
      number,
      completed: false,
    };

    dispatch(addContactRequest());

    axios
      .post('/contacts', contact)
      .then(({ data }) => dispatch(addContactSuccess(data)))
      .catch(error => dispatch(addContactError(error)));
  };
