import React from "react";

const Button = ({ Text, onClick, style }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      style={style}
    >
      {Text}
    </button>
  );
};

export default Button;
