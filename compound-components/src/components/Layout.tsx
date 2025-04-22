import { AppShell, Flex, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import IconAddressBook from '@tabler/icons-react/dist/esm/icons/IconAddressBook';

type LayoutProps = {
  title: ReactNode;
  children: ReactNode;
  rightSection?: ReactNode;
};

export const Layout = ({ children, rightSection, title }: LayoutProps) => {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Flex align={"center"} p="sm" justify={"space-between"}>
          <Flex align={"center"} gap="xs">
            <Link to="/">
              <IconAddressBook />
            </Link>
            <Title order={4}>{title}</Title>
          </Flex>
          {rightSection}
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
