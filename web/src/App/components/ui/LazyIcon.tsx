type Name = keyof Awaited<typeof import("@tabler/icons-react")>;

export const getLazyIcon = (name: Name) => () =>
  import("@tabler/icons-react").then((module) => ({
    default: module[name],
  })) as any;
