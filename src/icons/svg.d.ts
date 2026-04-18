declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const SVGComponent: FC<SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

// Plain .svg import → URL string (default Vite behaviour)
declare module "*.svg" {
  const src: string;
  export default src;
}
