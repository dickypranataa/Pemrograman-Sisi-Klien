// Button.jsx
import React from "react";

const Button = ({ style, text, onClick }) => {
  return (
    <button className={`px-4 py-2 rounded ${style}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
