import React from "react";
import { useStateContext } from "../context/ContextProvider";

function Button({
  bgColor,
  bgHoverColor,
  icon,
  color,
  size,
  text,
  borderRadius,
  type
}) {
  const { setIsClicked, initialState } = useStateContext();
  return (
    <button
      type={type ? `${type}`:'button'}
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl  hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
}

export default Button;
