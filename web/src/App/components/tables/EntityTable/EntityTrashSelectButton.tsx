import { Button } from "@mantine/core";
import { type ButtonHTMLAttributes } from "react";
import { TbTrash, TbX } from "react-icons/tb";

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
        <TbTrash color={"grey"} size={14} />
      </Button>
    );
  }

  return (
    <>
      <Button color="grey" size="sm" p={6} variant="subtle" onClick={onCancel}>
        <div style={{ paddingRight: "0.5ch" }}>Cancel</div>
        <TbX color={"grey"} size={14} />
      </Button>
      <Button color="red" size="sm" p={6} variant="subtle" onClick={onExecute}>
        <div style={{ paddingRight: "0.5ch" }}>Confirm Delete</div>
        <TbTrash color={"pink"} size={14} />
      </Button>
    </>
  );
}
