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
import "./index.css";
import { Patterns } from "./patterns/Patterns";
import Pattern1 from "./patterns/part-01-simple-query";
import Pattern2 from "./patterns/part-02-custom-query";
import Pattern3 from "./patterns/part-03-selectors";
import Pattern4 from "./patterns/part-04-parameterized-queries";
import Pattern5 from "./patterns/part-05-disabling-queries";
import Pattern6 from "./patterns/part-06-pagination";

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
const pattern2 = createRoute({
  path: "/02",
  getParentRoute: () => rootRoute,
  component: Pattern2,
});
const pattern3 = createRoute({
  path: "/03",
  getParentRoute: () => rootRoute,
  component: Pattern3,
});
const pattern4 = createRoute({
  path: "/04",
  getParentRoute: () => rootRoute,
  component: Pattern4,
});
const pattern5 = createRoute({
  path: "/05",
  getParentRoute: () => rootRoute,
  component: Pattern5,
});
const pattern6 = createRoute({
  path: "/06",
  getParentRoute: () => rootRoute,
  component: Pattern6,
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
]);

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
