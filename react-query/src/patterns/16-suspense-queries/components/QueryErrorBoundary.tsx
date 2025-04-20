import { Button } from "@mantine/core";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type QueryErrorBoundaryProps = {
  children: ReactNode;
};
export const QueryErrorBoundary = ({ children }: QueryErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
