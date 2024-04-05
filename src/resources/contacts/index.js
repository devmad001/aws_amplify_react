import loadable from '@loadable/component';

export const ContactCreate = loadable( () => import( '~/resources/contacts/ContactCreate' ) );
export const ContactEdit = loadable( () => import( '~/resources/contacts/ContactEdit' ) );
export const ContactList = loadable( () => import( '~/resources/contacts/ContactList' ) );
export const ContactShow = loadable( () => import( '~/resources/contacts/ContactShow' ) );
