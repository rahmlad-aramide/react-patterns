import { Alert, Button, Card, Center, Pagination, Table } from "@mantine/core";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useContacts } from "../../../api/hooks";

export const ContactsTable = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, refetch } = useContacts(page);
  if (isPending)
    return (
      <Card withBorder radius={"md"} shadow="md">
        {isPending && <Spinner />}
      </Card>
    );
  if (isError)
    return (
      <Alert variant="light" color="red" title="Error loading contacts">
        <Button color="red" onClick={() => refetch()}>
          Try Again
        </Button>
      </Alert>
    );
  return (
    <Card withBorder radius={"md"} shadow="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.contacts.map((contact) => (
            <Table.Tr>
              <Table.Td>{contact.firstName + " " + contact.lastName}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Center>
        <Pagination
          total={data?.totalPages || 0}
          value={page}
          onChange={setPage}
          mt="sm"
        />
      </Center>
    </Card>
  );
};
