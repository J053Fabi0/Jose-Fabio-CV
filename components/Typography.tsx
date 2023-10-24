import { JSX } from "preact";

const commonStyles = "font-sans antialiased";
const headersCommonStyles = "font-semibold tracking-normal";

const textStyles = {
  h1: `${headersCommonStyles} text-5xl leading-tight`,
  h2: `${headersCommonStyles} text-4xl leading-[1.3]`,
  h3: `${headersCommonStyles} text-3xl leading-snug`,
  h4: `${headersCommonStyles} text-2xl leading-snug`,
  h5: `${headersCommonStyles} text-xl leading-snug`,
  h6: `${headersCommonStyles} text-base leading-relaxed`,

  p: "text-base font-normal leading-relaxed",
  lead: "text-xl font-normal leading-relaxed",
  smallP: "text-sm font-light leading-normal",
};

export interface TypographyProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  variant?: keyof typeof textStyles;
}

const Typography = ({ variant = "p", ...props }: TypographyProps) => {
  props.class = `${props.class ?? ""} ${getTypographyClass(variant)}`;

  switch (variant) {
    case "h1":
      return <h1 {...props} />;
    case "h2":
      return <h2 {...props} />;
    case "h3":
      return <h3 {...props} />;
    case "h4":
      return <h4 {...props} />;
    case "h5":
      return <h5 {...props} />;
    case "h6":
      return <h6 {...props} />;

    case "p":
    case "lead":
    case "smallP":
    default:
      return <p {...props} />;
  }
};

export const getTypographyClass = (variant: keyof typeof textStyles = "p") =>
  `${commonStyles} ${textStyles[variant]}`;

export default Typography;
