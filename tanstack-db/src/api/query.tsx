import { notifications } from "@mantine/notifications";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { client, Contact } from "./client";

const contactsQueryOptions = queryOptions({
  queryKey: ["contacts", "list"],
  queryFn: () => client.getContacts(),
});

export const useContacts = () => useQuery(contactsQueryOptions);
export const useContactsCount = () =>
  useQuery({
    ...contactsQueryOptions,
    select: (data) => data.contacts.length,
  });

export const useContactDetails = (contactId: string | undefined) =>
  useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => client.getContact(contactId!),
    enabled: !!contactId,
  });

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => client.deleteContact(contactId),
    onSuccess: () =>
      notifications.show({
        icon: <IconCircleCheckFilled />,
        color: "green",
        message: "Contact deleted",
      }),
    onError: () =>
      notifications.show({
        icon: <IconCircleXFilled />,
        color: "red",
        message: "Error deleting contact",
      }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useEditContact = (
  contactId: string | undefined,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-contact", contactId],
    mutationFn: (contact: Contact) => client.editContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      onSuccess?.();
    },
  });
};
