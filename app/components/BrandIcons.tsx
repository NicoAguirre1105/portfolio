import type { ReactElement } from "react";

type IconProps = { className?: string };

export function UpworkIcon({ className }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element -- static brand SVG, next/image doesn't optimize SVGs anyway
  return <img src="/upwork.svg" alt="" aria-hidden="true" className={className} />;
}

export function ContraIcon({ className }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element -- static brand SVG, next/image doesn't optimize SVGs anyway
  return <img src="/contra.svg" alt="" aria-hidden="true" className={className} />;
}

export function LinkedInIcon({ className }: IconProps) {
  // eslint-disable-next-line @next/next/no-img-element -- static brand SVG, next/image doesn't optimize SVGs anyway
  return <img src="/linked.svg" alt="" aria-hidden="true" className={className} />;
}

export const socialIcons: Record<string, (props: IconProps) => ReactElement> = {
  Upwork: UpworkIcon,
  Contra: ContraIcon,
  LinkedIn: LinkedInIcon,
};
