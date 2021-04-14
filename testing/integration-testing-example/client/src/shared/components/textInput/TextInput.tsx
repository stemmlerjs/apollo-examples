import React from "react";
import "./TextInput.css";

interface TextInputProps {
  type: "email" | "password";
  onChange: (val: string) => void;
  placeholder?: string;
}

const TextInput = (props: TextInputProps) => (
  <input
    placeholder={props.placeholder}
    className="text-input"
    type={props.type}
    onChange={(e) => props.onChange(e.target.value)}
  />
);

export default TextInput;
