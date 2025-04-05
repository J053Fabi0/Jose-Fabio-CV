import SiMui from "@preact-icons/si/SiMui";
import TbApi from "@preact-icons/tb/TbApi";
import SiDeno from "@preact-icons/si/SiDeno";
import SiFresh from "@preact-icons/si/SiFresh";
import FaReact from "@preact-icons/fa/FaReact";
import SiExpress from "@preact-icons/si/SiExpress";
import SiGraphql from "@preact-icons/si/SiGraphql";
import SiMongodb from "@preact-icons/si/SiMongodb";
import SiBootstrap from "@preact-icons/si/SiBootstrap";
import SiNodedotjs from "@preact-icons/si/SiNodedotjs";
import BiLogoJavascript from "@preact-icons/bi/BiLogoJavascript";
import BiLogoTypescript from "@preact-icons/bi/BiLogoTypescript";
import RiTailwindCssLine from "@preact-icons/ri/RiTailwindCssLine";

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
