import React from "react";

function Input({
  type = "text",
  inputClassName = "",
  inputValue = "",
  inputId,
  mainDivClassName = "",
  label = "",
  placeholder = "",
  onChange,
  name,
  disabled = false,
  required = true,
  error = ""
}) {
  return (
    <div className={mainDivClassName}>

      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 md:text-lg font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={inputValue}
        name={name}
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        disabled={disabled}
        required={required}
        className={`w-full outline-none px-3 py-2 md:px-5 md:py-3 rounded-lg border transition
        ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-green-300"
        }
        focus:ring-2 ${inputClassName}`}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

    </div>
  );
}

export default Input;