
import React from 'react'
import "./Button.css"

interface ButtonProps {
  text: string;
  onSubmit: () => void;
}

const Button = (props: ButtonProps) => (
  <button 
    onClick={() => props.onSubmit()} 
    className="button">{props.text}
  </button>
)

export default Button;