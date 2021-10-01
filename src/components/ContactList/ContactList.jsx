import { useDispatch, useSelector } from 'react-redux';
import ContactItem from './ContactItem';
import * as actions from '../../Redux/actions';
import s from './ContactList.module.css';

export default function ContactList() {
  const filter = useSelector(state => state.contacts.filter);
  const items = useSelector(state => state.contacts.items);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  const dispatch = useDispatch();
  const onDeleteBtnClick = contact => dispatch(actions.deleteContact(contact));

  return (
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
