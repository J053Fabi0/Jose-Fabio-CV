import {
  SiBootstrap,
  SiDeno,
  SiExpress,
  SiFresh,
  SiGraphql,
  SiMongodb,
  SiMui,
  SiNodedotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssLine } from "react-icons/ri";
import { BiLogoJavascript, BiLogoTypescript } from "react-icons/bi";

const icons = {
  API: TbApi,
  MUI: SiMui,
  Deno: SiDeno,
  Fresh: SiFresh,
  React: FaReact,
  MongoDB: SiMongodb,
  GraphQL: SiGraphql,
  Express: SiExpress,
  Bootstrap: SiBootstrap,
  ["Node.JS"]: SiNodedotjs,
  TypeScript: BiLogoTypescript,
  JavaScript: BiLogoJavascript,
  TailwindCSS: RiTailwindCssLine,
} as const;

export default icons;

export type Icons = keyof typeof icons;

export function isIcon(str: string): str is Icons {
  return str in icons;
}
