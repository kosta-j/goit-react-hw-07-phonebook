import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContact } from '../../Redux/operations';
import {
  getContacts,
  getFilter,
  getVisibleContacts,
} from '../../Redux/selectors';
import Notification from '../Notification/Notification';
import ContactItem from './ContactItem';
import s from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchContact()), [dispatch]);

  const filter = useSelector(getFilter);
  const items = useSelector(getContacts);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  const onDeleteBtnClick = contact => dispatch(deleteContact(contact.id));

  return items.length < 1 ? (
    <Notification text="Contact list is empty" />
  ) : (
    <ul className={s.contactList}>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          number={contact.number}
        >
          <button type={s.button} onClick={() => onDeleteBtnClick(contact)}>
            Delete
          </button>
        </ContactItem>
      ))}
    </ul>
  );
}
