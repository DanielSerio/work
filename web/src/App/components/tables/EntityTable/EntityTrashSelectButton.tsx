import { getLazyIcon } from "#components/ui/LazyIcon";
import { Button, Loader } from "@mantine/core";
import { lazy, Suspense, type ButtonHTMLAttributes } from "react";

interface TrashSelectButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelectMode: boolean;
  onStart: () => void;
  onExecute: () => void;
  onCancel: () => void;
}

export function EntityTrashSelectButton({
  onStart,
  onExecute,
  onCancel,
  isSelectMode,
}: TrashSelectButtonProps) {
  const Icon = lazy(getLazyIcon("IconTrash"));
  const XIcon = lazy(getLazyIcon("IconX"));

  if (!isSelectMode) {
    return (
      <Button
        size="sm"
        p={6}
        style={{ maxWidth: 36 }}
        variant="subtle"
        color="red"
        onClick={onStart}
      >
        <Suspense fallback={<Loader color="grey" size="xs" />}>
          <Icon color={"grey"} />
        </Suspense>
      </Button>
    );
  }

  return (
    <>
      <Button color="grey" size="sm" p={6} variant="subtle" onClick={onCancel}>
        <div style={{ paddingRight: "0.5ch" }}>Cancel</div>
        <Suspense fallback={<Loader color="grey" size="xs" />}>
          <XIcon color={"grey"} size={14} />
        </Suspense>
      </Button>
      <Button color="red" size="sm" p={6} variant="subtle" onClick={onExecute}>
        <div style={{ paddingRight: "0.5ch" }}>Confirm Delete</div>
        <Suspense fallback={<Loader color="grey" size="xs" />}>
          <Icon color={"pink"} size={14} />
        </Suspense>
      </Button>
    </>
  );
}
