import { forwardRef, type ForwardedRef } from "react";
import { TimeInput, type TimeInputProps } from "@mantine/dates";

function TimeFieldComponent(
  { ...props }: TimeInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return <TimeInput {...props} ref={ref} />;
}

export const TimeField = forwardRef(TimeFieldComponent);
