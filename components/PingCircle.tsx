import { JSX } from "preact";
import { ShadedColors } from "../utils/twindColors.ts";

interface PingCircleProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  color?: ShadedColors;
}

export default function PingCircle({ color = "sky", class: classes, ...props }: PingCircleProps) {
  const style = `${classes} relative flex h-3 w-3`;

  return (
    <span class={style} {...props}>
      <span class={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`} />
      <span class={`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`} />
    </span>
  );
}
