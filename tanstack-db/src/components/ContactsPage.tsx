import { useState } from "react";
import { ContactsTable } from "./ContactsTable";
import { EditContactModal } from "./EditContactModal";
import { Layout } from "./Layout";
import { TopBar } from "./TopBar";

export function ContactsPage() {
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >(undefined);
  return (
    <Layout>
      <TopBar />
      <ContactsTable onContactClick={setSelectedContactId} />
      <EditContactModal
        editContactId={selectedContactId}
        close={() => setSelectedContactId(undefined)}
      />
    </Layout>
  );
}
