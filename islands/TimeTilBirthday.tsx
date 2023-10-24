import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useComputed, useSignal } from "@preact/signals";
import { rangeMsToTimeDescription } from "../utils/msToTimeDescription.ts";

export default function TimeTilBirthday() {
  const nextBirthday = useComputed<Date>(() => new Date());

  useEffect(() => {
    nextBirthday.value.setHours(0, 0, 0, 0);
    nextBirthday.value.setDate(15);
    nextBirthday.value.setMonth(8);
    if (nextBirthday.value.valueOf() <= Date.now())
      nextBirthday.value.setFullYear(nextBirthday.value.getFullYear() + 1);
  }, []);

  const time = useSignal<string>("");
  useEffect(() => {
    time.value = rangeMsToTimeDescription(nextBirthday.value);
  }, []);
  const interval = useSignal<number | undefined>(undefined);

  if (IS_BROWSER) {
    interval.value = setInterval(
      (
        (nextBirthdayDate = nextBirthday.value) =>
        () => {
          const newValue = rangeMsToTimeDescription(nextBirthdayDate);

          if (time.peek() !== newValue) {
            clearInterval(interval.value);
            time.value = newValue;
          }
        }
      )(),
      1000
    );
  }

  return <>{time.value}</>;
}
