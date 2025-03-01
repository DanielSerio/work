import type { PropsWithChildren } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { primary, secondary, grey } from "./theme";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";

const THEME = createTheme({
  fontFamily: "Red Hat Text",
  fontFamilyMonospace: "Red Hat Mono",
  colors: {
    primary,
    secondary,
    grey,
  },
});

export const QC = new QueryClient();

function AppProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={THEME} defaultColorScheme="dark">
      <QueryClientProvider client={QC}>{children}</QueryClientProvider>
    </MantineProvider>
  );
}

export function AppModule() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
