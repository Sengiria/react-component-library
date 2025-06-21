import { useState } from "react";
import type { InputFieldProps } from "./types";
import PasswordToggle from "./PasswordToggle";
import { INPUT_PREFIX } from "./constants";

const InputField: React.FC<InputFieldProps> = ({
  label,
  hidden = false,
  required = false,
  name = label,
  onFocus,
  onBlur,
  onChange,
}) => {
  const [inputText, setInputText] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
    onChange && onChange()
  }

  const isFilled = inputText.length > 0
  const inputId = `${INPUT_PREFIX}${label}`;

  return (
    <div className="input-wrapper relative w-50 mt-10">
      <input
        id={inputId}
        type={hidden && !showPassword ? "password" : "text"}
        autoComplete="off"
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        required={required}
        className="peer border-2 border-gray-300 rounded-lg h-13 w-full focus:outline-none focus:border-gray-300 px-2 text-sm"

      />

      <label htmlFor={inputId}
        className={`
          ${isFilled ? `top-1 scale-90 text-gray-800 bg-sky-200` : "top-1/2 bg-white scale-100 text-gray-400"}
          absolute rounded left-2 text-[11px] -translate-y-1/2 transition-all duration-300 ease-in-out px-1
          peer-focus:top-1 peer-focus:scale-90 peer-focus:text-gray-800 peer-focus:bg-sky-200
          `}>
        {label.toUpperCase()}
      </label>
      {
        hidden && <PasswordToggle visible={showPassword} onClick={() => setShowPassword(p => !p)} />
      }
    </div>
  )
};

export default InputField;
