import { Title } from "@mantine/core";
import { useContactsCount } from "../api/db";

export const TopBar = () => {
  const { data } = useContactsCount();
  return (
    <div className="p-4 border-b border-gray-500">
      <Title order={4}>{data ?? "-"} Contacts</Title>
    </div>
  );
};
