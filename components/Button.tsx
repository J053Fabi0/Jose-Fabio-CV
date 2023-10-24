import { JSX } from "preact";

const padding = "py-2 px-4";
const common = `middle none center rounded-lg font-sans text-xs font-bold uppercase text-white
  shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none
  active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50
  disabled:shadow-none`;

export const buttonColors = {
  red: "bg-pink-500 shadow-pink-500/20 hover:shadow-pink-500/40",
  blue: "bg-blue-500 shadow-blue-500/20 hover:shadow-blue-500/40",
  green: "bg-green-500 shadow-green-500/20 hover:shadow-green-500/40",
  // orange: "bg-orange-500 shadow-orange-500/20 hover:shadow-orange-500/40",
};

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof buttonColors;
}

export function getButtonClasses(color: keyof typeof buttonColors = "blue", addPadding = true) {
  return `${common} ${buttonColors[color]} ${addPadding ? padding : ""}`;
}

export default function Button(props: ButtonProps) {
  const setsPadding =
    typeof props.class === "string" && props.class.split(" ").some((c) => /^(p|py|px|pt|pb|pr|pl)-/.test(c));

  const style = `${getButtonClasses(props.color, !setsPadding)} ${props.class ?? ""}`;

  return (
    <button {...props} class={style}>
      {props.children}
    </button>
  );
}
