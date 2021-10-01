import { useSelector } from 'react-redux';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Notification from '../Notification/Notification';
import Section from '../Section/Section';
import s from './Wrapper.module.css';

export default function Wrapper() {
  const contacts = useSelector(state => state.contacts.items);

  return (
    <div className={s.wrapper}>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        {contacts.length < 1 ? (
          <Notification text="Contact list is empty" />
        ) : (
          <>
            <Filter />
            <ContactList />
          </>
        )}
      </Section>
    </div>
  );
}
