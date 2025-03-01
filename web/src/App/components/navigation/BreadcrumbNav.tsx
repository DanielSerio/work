import { Anchor, Breadcrumbs } from "@mantine/core";
import { useRouterState } from "@tanstack/react-router";

export type BreadcrumbProps = {
  title: string;
  href?: string;
};

function toBreadcrumbProps(
  title: string,
  pathChunks: string[]
): BreadcrumbProps {
  if (title === "entry" || title === "report") {
    return {
      title,
    };
  }

  return {
    title,
    href: `/#/${pathChunks.join("/")}`,
  };
}

function constructBreadcrumbsFromPathName(
  path: string | null
): null | BreadcrumbProps[] {
  if (path === null) return null;

  const splitPattern = path.replace(/^\//, "");
  const root = {
    title: "dashboard",
    href: "/#/",
  };

  if (splitPattern.indexOf("/")) {
    const chunks = splitPattern.split(/\//g);

    return [
      root,
      ...chunks.map((val, i) => toBreadcrumbProps(val, chunks.slice(0, i + 1))),
    ];
  }

  return [root, toBreadcrumbProps(splitPattern, [path])];
}

export function BreadcrumbNav() {
  const routerState = useRouterState();

  const items = constructBreadcrumbsFromPathName(
    routerState.resolvedLocation?.pathname ?? null
  );

  if (!items) return <></>;

  return (
    <div className="breadcrumb-nav">
      <Breadcrumbs>
        {items.map((item) => {
          if (!item.href) {
            return (
              <span key={item.title}>
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  {item.title}
                </span>
              </span>
            );
          }
          return (
            <Anchor href={item.href} key={item.href}>
              <span style={{ textTransform: "capitalize" }}> {item.title}</span>
            </Anchor>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
