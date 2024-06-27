import * as React from "react";
import type { SVGProps } from "react";

export const EntrybaseLogo = ({
  size = 64,
  fill = "#4BE7AE",
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 64 64" {...props}>
    <path
      fill={fill}
      fillRule="evenodd"
      d="m.035.069 31.55 15.648V0L64 16.094V47.94L31.584 64V48.352L0 64V47.39l30.961-15.304v-.137L0 16.643zM62.58 32.017 32.416 17.055V46.98z"
      clipRule="evenodd"
    />
  </svg>
);
