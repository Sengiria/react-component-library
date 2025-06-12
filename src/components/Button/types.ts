import type { COLOR_DANGER, COLOR_DEFAULT, COLOR_PRIMARY, COLOR_SECONDARY } from "./constants";

export type ButtonColor =
  | typeof COLOR_DEFAULT
  | typeof COLOR_PRIMARY
  | typeof COLOR_SECONDARY
  | typeof COLOR_DANGER;

export type ButtonProps = {
  color?: ButtonColor;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  ripple?: boolean;
  className?: string;
};

