import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { PasswordToggleProps } from "./types";
import { HIDE_PASSWORD, SHOW_PASSWORD } from "./constants";

const PasswordToggle: React.FC<PasswordToggleProps> = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
    aria-label={visible ? HIDE_PASSWORD : SHOW_PASSWORD}
    aria-pressed={visible}
  >
    {visible ? <FaEyeSlash /> : <FaEye />}
  </button>
);

export default PasswordToggle;
