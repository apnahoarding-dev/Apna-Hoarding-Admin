import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="flex flex-col gap-[12px] items-start">
        <div className="text-[16px] text-[#666666] font-[400]">Password</div>
        <input
          className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] mb-[16px] "
          type="password"
          placeholder="password... "
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className=" rounded-xl text-[18px] text-[#FFF] bg-[#B88E2F] hover:bg-[#a37c20] w-full font-[600] p-[16px] cursor-pointer disabled:bg-[#dbbb6f]"
          onClick={() => {
            password === "admin@123"
              ? navigate("/allItem")
              : toast.error("Password is incorrect!");
          }}
        >
          Dashboaard
        </button>
      </div>
    </div>
  );
};

export default Login;
