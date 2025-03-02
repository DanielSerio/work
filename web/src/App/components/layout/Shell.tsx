import { Logo } from "#components/ui/Logo";
import { AppShell, Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { PropsWithChildren } from "react";

export function Shell({ children }: PropsWithChildren) {
  const [menuIsOpen, { toggle }] = useDisclosure();
  const [desktopMenuIsOpen, { toggle: toggleDesktopMenu }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 48 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: !menuIsOpen, desktop: !desktopMenuIsOpen },
      }}
    >
      <AppShell.Header className="app-header">
        <Flex align={"center"} gap={12} h="100%">
          <Burger
            hiddenFrom="sm"
            style={{ opacity: 0.6 }}
            opened={menuIsOpen}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Burger
            visibleFrom="sm"
            style={{ opacity: 0.6 }}
            opened={desktopMenuIsOpen}
            onClick={toggleDesktopMenu}
            aria-label="Toggle navigation"
          />
          <a href="/#/">
            <Logo />
          </a>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>NAV</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
