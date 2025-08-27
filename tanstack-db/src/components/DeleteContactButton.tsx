import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteContact } from "../api/db";
type DeleteContactButtonProps = {
  contactId: string;
};

export const DeleteContactButton = ({
  contactId,
}: DeleteContactButtonProps) => {
  const { mutate } = useDeleteContact();
  return (
    <ActionIcon variant="light" color="red" onClick={() => mutate(contactId)}>
      <IconTrash size={14} />
    </ActionIcon>
  );
};
