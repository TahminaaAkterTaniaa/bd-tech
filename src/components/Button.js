import React from "react";

const Button = ({ text, handleClick, disable }) => {
  return (
    <button
      disabled={disable}
      onClick={handleClick}
      className={`${
        disable ? "bg-[#167f5f]/70" : "bg-[#167F5F]"
      } rounded-[15px] text-white text-xl font-extrabold w-full`}
      style={{ padding: "20px 25px 20px 25px" }}
    >
      {text}
    </button>
  );
};

export default Button;
