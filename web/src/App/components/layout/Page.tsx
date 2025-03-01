import type { PropsWithChildren } from "react";

export function Page({ children }: PropsWithChildren) {
  return <div id="page">{children}</div>;
}
