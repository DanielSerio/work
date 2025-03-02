import { getLazyIcon } from "#components/ui/LazyIcon";
import { Button, Loader } from "@mantine/core";
import { lazy, Suspense, type ButtonHTMLAttributes } from "react";

export function EntityTrashSelectButton({
  onClick,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const Icon = lazy(getLazyIcon("IconTrash"));
  return (
    <Button
      size="sm"
      p={6}
      style={{ maxWidth: 36 }}
      variant="subtle"
      onClick={onClick}
    >
      <Suspense fallback={<Loader color="grey" size="xs" />}>
        <Icon color={"grey"} />
      </Suspense>
    </Button>
  );
}
