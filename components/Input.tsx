import { JSX } from "preact";
import { getTypographyClass } from "./Typography.tsx";

const styles = {
  label:
    `whitespace-nowrap flex items-top gap-2 max-w-full md:max-w-[40%] font-semibold ` +
    `${getTypographyClass("p")}`,
};

export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
}

export default function Input({ name, id, ...props }: InputProps) {
  return (
    <label class={`flex gap-2 flex-wrap md:flex-nowrap ${props.class}`} title={name}>
      <div class={`${styles.label} md:mb-[-3px]`}>
        <p class="truncate text-ellipsis font-semibold select-none">
          {name}
          {props.required ? (
            <span class="text-red-700 font-normal" title="Requerido">
              *
            </span>
          ) : null}
        </p>
      </div>

      <input
        {...props}
        id={id}
        name={id}
        type="text"
        class="px-1 md:px-2 w-full border-b-2 border-b-black h-[fit-content]"
      />
    </label>
  );
}
