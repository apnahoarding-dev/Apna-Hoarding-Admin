import React from "react";

const FooterItems = (props) => {
  return (
    <div className="flex flex-col items-start justify-between h-[366px]">
      <div className="text-[24px] text-[#000] font-[700]">{props.head}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.first}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.second}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.third}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.fourth}</div>
      <div className="text-[16px] text-[#000] font-[400]">{props.fifth}</div>
    </div>
  );
};

export default FooterItems;
