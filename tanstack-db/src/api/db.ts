import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection, eq, useLiveQuery } from "@tanstack/react-db";
import { QueryClient } from "@tanstack/react-query";
import { client, Contact } from "./client";

export const queryClient = new QueryClient();

const contactsCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["contacts"],
    queryClient,
    queryFn: async () => await client.getContacts().then((r) => r.contacts),
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const { modified: newContact } = transaction.mutations[0];
      await client.createContact(newContact);
    },
    onUpdate: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      client.editContact(modified);
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0];
      client.deleteContact(original.id);
    },
  })
);

export const useContacts = () =>
  useLiveQuery((q) => q.from({ contact: contactsCollection }));

export const useContactDetails = (contactId: string | undefined) =>
  useLiveQuery((q) =>
    q
      .from({ contact: contactsCollection })
      .where(({ contact }) => eq(contact.id, contactId))
      .limit(1)
  );

export const useDeleteContact = () => ({
  mutate: (id: string) => contactsCollection.delete(id),
});

export const useEditContact = () => ({
  mutate: (contact: Contact) =>
    contactsCollection.update(contact.id, (draft) =>
      Object.assign(contact, draft)
    ),
});

export const useContactsCount = () => {
  const { data } = useContacts();
  return { data: data?.length };
};
