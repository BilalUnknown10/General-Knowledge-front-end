import React from "react";

function Input({type, inputClassName, inputValue, inputId, mainDivClassName, label, placeholder, onChange,name, disabled}) {
  return (
    <div className={`${mainDivClassName}`}>
      <label className="md:text-2xl" htmlFor={inputId}>{label}</label>
      <input
        type={`${type}`}
        value={`${inputValue}`}
        name={`${name}`}
        autoComplete="off"
        className={`${inputClassName} outline-0 px-2 py-2 md:px-6 md:py-3 rounded-md md:text-xl`}
        id={`${inputId}`}
        placeholder={`${placeholder}`}
        onChange={onChange}
        required
        disabled = {disabled}
      />
    </div>
  );
}

export default Input;
