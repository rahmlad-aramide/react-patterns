import { Card } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ContactsPage } from "./components/ContactsPage";
import { QueryErrorBoundary } from "./components/QueryErrorBoundary";
import { Spinner } from "./components/Spinner";

const queryClient = new QueryClient();

export default function Pattern() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        <Suspense
          fallback={
            <Card withBorder radius={"md"} shadow="md" m="sm">
              <Spinner />
            </Card>
          }
        >
          <ContactsPage />;
        </Suspense>
      </QueryErrorBoundary>
    </QueryClientProvider>
  );
}
