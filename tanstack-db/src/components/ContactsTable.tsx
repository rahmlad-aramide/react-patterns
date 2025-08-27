import { Alert, Anchor, Card, Table } from "@mantine/core";
import { useContacts } from "../api/db";
import { DeleteContactButton } from "./DeleteContactButton";
import { Spinner } from "./Spinner";

type ContactsTableProps = {
  onContactClick: (contactId: string) => void;
};
export const ContactsTable = ({ onContactClick }: ContactsTableProps) => {
  const { data, isLoading, isError } = useContacts();

  if (isLoading)
    return (
      <Card withBorder radius={"md"} shadow="md" m="sm">
        <Spinner />{" "}
      </Card>
    );

  if (isError)
    return (
      <Alert
        variant="light"
        color="red"
        title="Error loading contacts"
        m="sm"
      ></Alert>
    );
  return (
    <Card withBorder radius={"md"} shadow="md" m="sm">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((contact) => (
            <Table.Tr key={contact.id} className="group">
              <Table.Td>
                <Anchor onClick={() => onContactClick(contact.id)}>
                  {contact.firstName + " " + contact.lastName}
                </Anchor>
              </Table.Td>
              <Table.Td className="flex justify-end opacity-0 group-hover:opacity-100 transition-all">
                <DeleteContactButton contactId={contact.id} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};
