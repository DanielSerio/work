import { getLazyIcon } from "#components/ui/LazyIcon";
import { Button, Loader } from "@mantine/core";
import { lazy, Suspense } from "react";

export function EntityFilterButton() {
  const Icon = lazy(getLazyIcon("IconFilter"));

  return (
    <Button size="sm" p={6} style={{ maxWidth: 36 }} variant="subtle">
      <Suspense fallback={<Loader color="grey" size="xs" />}>
        <Icon />
      </Suspense>
    </Button>
  );
}
