import type { PropsWithChildren } from "react";

export function Page({ children }: PropsWithChildren) {
  return <main id="page">{children}</main>;
}
