export type InputFieldProps = {
  label: string;
  hidden?: boolean;
  required?: boolean;
  name?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: () => void;

};

export interface PasswordToggleProps {
  visible: boolean;
  onClick: () => void;
}

