import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(`${__dirname}`, './db/contacts.json');


// TODO: Document every feature
export const listContacts = async () => {
   // Returns an array of contacts.
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
  
};

export const getContactById = async contactId => {
  // Returns the contact object with this id. Returns null if no contact with this id is found.  
try {
  const contacts = await listContacts();
  const contact = contacts.find(el => el.id === contactId);
  return contact || null;
} catch (error) {
  console.error("Error reading contacts by ID:", error.message);
}
  
};

export const removeContact = async contactId => {
  // Returns the object of the deleted contact. Returns null if no contact with this id is found.  
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(el => el.id === contactId);

    if (index === -1) {
    return null;
  }

    const [removeItem] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removeItem;
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
  
};

export const addContact = async data => {
  // Returns the object of the added contact.  const contacts = await listContacts();
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
    return newContact;
  } catch (error) {
    console.error("Error adding new contact:", error.message);
  }

};
