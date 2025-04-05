import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Patterns } from "./patterns/Patterns";
import { Pattern1 } from "./patterns/part-01-simple-query/Pattern1";

const rootRoute = createRootRoute({
  component: Outlet,
});
const indexRoute = createRoute({
  path: "/",
  component: Patterns,
  getParentRoute: () => rootRoute,
});
const pattern1 = createRoute({
  path: "/01",
  getParentRoute: () => rootRoute,
  component: Pattern1,
});

const routeTree = rootRoute.addChildren([pattern1, indexRoute]);

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();
// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider forceColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}
