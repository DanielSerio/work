import { Button, Menu } from "@mantine/core";
import { TbDotsVertical } from "react-icons/tb";

export type EntityTableMenuProps = {
  onNewClick: () => void;
  onColumnsClick: () => void;
};

export function EntityTableMenu({
  onNewClick,
  onColumnsClick,
}: EntityTableMenuProps) {
  return (
    <Menu>
      <Menu.Target>
        <Button size="xs" variant="subtle" p={0} style={{ minWidth: 30 }}>
          <TbDotsVertical />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={onNewClick}>Create new</Menu.Item>
        <Menu.Item onClick={onColumnsClick}>Show Columns</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
