import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function CurrentTime() {
  const currentTime = useSignal<string>(new Date().toLocaleString());

  const interval = useSignal<number | undefined>(undefined);

  if (IS_BROWSER)
    interval.value = setInterval(
      (() => () => {
        clearInterval(interval.value);
        currentTime.value = new Date().toLocaleString();
      })(),
      1000
    );

  return <>{currentTime.value}</>;
}
