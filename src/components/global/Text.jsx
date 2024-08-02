import React from "react";

const Text = (props) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="text-[16px] text-[#9F9F9F] font-[400]">{props.head}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.text}</div>
    </div>
  );
};

export default Text;
