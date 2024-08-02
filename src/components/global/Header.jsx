import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.svg";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col w-full ">
        <div className="flex items-center justify-between  h-[100px] px-[34px] w-full  shadow-sm">
          <img src={logo} alt="logo" />
          <div className="flex gap-[16px] pr-6">
            <div
              className="text-[26px] text-[#626060] font-semibold pr-8 cursor-pointer"
              onClick={() => navigate("/addItem")}
            >
              Create Advertisement
            </div>
            <div
              className="text-[26px] text-[#626060] font-semibold pr-8 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Back
            </div>
          </div>
        </div>
        <div className=" bg-[#F9F1E7] h-[100px] w-full" />
      </div>
    </>
  );
};

export default Header;
