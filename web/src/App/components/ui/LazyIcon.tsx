type Name = keyof Awaited<typeof import("react-icons/tb")>;

export const getLazyIcon = (name: Name) => () =>
  import(`react-icons/tb`).then((module) => ({
    default: module[name],
  })) as any;
