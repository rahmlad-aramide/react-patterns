import { Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getContactsQueryOptions } from "../../03-selectors/api/query";

export const TopBar = () => {
  const { data } = useQuery({
    ...getContactsQueryOptions,
    select: (data) => data.contacts.length,
  });
  return (
    <div className="p-4 border-b border-gray-500">
      <Title order={4}>{data} Contacts</Title>
    </div>
  );
};
