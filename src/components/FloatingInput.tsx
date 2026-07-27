import type { ChangeEvent, HTMLInputTypeAttribute } from "react";

import "../styles/FloatingInput.css";

type FloatingInputProps = {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FloatingInput(props: FloatingInputProps) {
  return (
    <div className={`floating-input ${props.value ? "filled" : ""}`}>
      <input {...props} aria-label={props.label} />
      <label htmlFor={props.id}>{props.label}</label>
      <button type="button">
        <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );
}