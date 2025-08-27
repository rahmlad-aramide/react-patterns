import { QueryClientProvider } from "@tanstack/react-query";
import { ContactsPage } from "./components/ContactsPage";
import { queryClient } from "./api/db";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsPage />
    </QueryClientProvider>
  );
}
