import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "green" | "outline" | "ghost-light";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: string;
}

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variantMap: Record<Variant, string> = {
  primary: "bg-brand-navy text-white shadow-soft hover:bg-brand-blue hover:-translate-y-0.5 hover:shadow-card",
  accent: "bg-gradient-to-r from-brand-orange to-brand-orangeDark text-white shadow-soft hover:-translate-y-0.5 hover:shadow-card",
  green: "bg-brand-green text-white shadow-soft hover:bg-brand-greenDark hover:-translate-y-0.5",
  outline: "border border-brand-line bg-white text-brand-navy hover:border-brand-accent hover:text-brand-accent",
  "ghost-light": "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};

function classes(variant: Variant, size: Size, className: string) {
  return `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/30 disabled:cursor-not-allowed disabled:opacity-60 ${sizeMap[size]} ${variantMap[variant]} ${className}`;
}

interface ButtonLinkProps extends BaseProps {
  to: string;
}
interface ButtonAnchorProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
}
interface ButtonButtonProps extends BaseProps {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

import Icon from "./Icon";

function Inner({ children, icon }: { children: ReactNode; icon?: string }) {
  return (
    <>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </>
  );
}

export function ButtonLink({ children, variant = "primary", size = "md", className = "", icon, to }: ButtonLinkProps) {
  return (
    <Link to={to} className={classes(variant, size, className)}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function ButtonAnchor({ children, variant = "primary", size = "md", className = "", icon, href, target, rel }: ButtonAnchorProps) {
  return (
    <a href={href} target={target} rel={rel} className={classes(variant, size, className)}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}

export function Button({ children, variant = "primary", size = "md", className = "", icon, onClick, type = "button", disabled }: ButtonButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes(variant, size, className)}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
