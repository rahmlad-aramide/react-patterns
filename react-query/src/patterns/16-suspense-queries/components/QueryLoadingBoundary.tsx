import { Card } from "@mantine/core";
import { ReactNode } from "@tanstack/react-router";
import { Suspense } from "react";
import { Spinner } from "./Spinner";

type QueryLoadingBoundaryProps = {
  children: ReactNode;
};

export const QueryLoadingBoundary = ({
  children,
}: QueryLoadingBoundaryProps) => {
  return (
    <Suspense
      fallback={
        <Card withBorder radius={"md"} shadow="md" m="sm">
          <Spinner />
        </Card>
      }
    >
      {children}
    </Suspense>
  );
};
