import { Button, Flex } from "@mantine/core";
import { Link, useRouterState } from "@tanstack/react-router";
import { getNextDateStamp, getPrevDateStamp } from "src/lib/utilities/datetime";

export function DateNavigator({ baseURL }: { baseURL: string }) {
  const routerState = useRouterState();
  const routerParams = routerState.matches.find(
    (v) => Object.keys(v.params).length > 0
  )?.params;

  if (!routerParams.entryDate) {
    return <></>;
  }

  const prevDateStamp = getPrevDateStamp(routerParams.entryDate);
  const nextDateStamp = getNextDateStamp(routerParams.entryDate);

  return (
    <Flex justify="space-between" className="date-navigator">
      <Link className="nav-btn" to={`${baseURL}${prevDateStamp}`}>
        Prev
      </Link>
      <Button
        variant="subtle"
        color="gray"
        radius={0}
        className="manual-date-btn"
      >
        Select Date
      </Button>
      <Link className="nav-btn" to={`${baseURL}${nextDateStamp}`}>
        Next
      </Link>
    </Flex>
  );
}
