import { Layout } from "./Layout";
import { ContactsTable } from "./ContactsTable";

export function ContactsPage() {
  return (
    <Layout title={"Contacts"}>
      <ContactsTable />
    </Layout>
  );
}
