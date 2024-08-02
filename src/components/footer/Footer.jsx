import React from "react";
import FooterItems from "./FooterItems";
import location from "../../assets/global/LocationIcon.svg";
import email from "../../assets/global/Emailicon.svg";
import call from "../../assets/global/Callicon.svg";
import facebook from "../../assets/Facebook.svg";
import youtube from "../../assets/YouTube.svg";
import twitter from "../../assets/Twitter.svg";
import linkdin from "../../assets/LinkedIn.svg";
import instagram from "../../assets/Instagram.svg";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col  w-full px-[84px]  mt-[60px]">
        <div className="h-[1px] w-full bg-[#D9D9D9] my-[16px]" />
        <div className="flex justify-between w-full px-[4px]">
          <FooterItems
            head="Quick Links"
            first="Login"
            second="About Us"
            third="Contact"
            fourth="Privacy policy"
            fifth="Refund policy"
          />
          <FooterItems
            head="Quick Links"
            first="Login"
            second="About Us"
            third="Contact"
            fourth="Privacy policy"
            fifth="Refund policy"
          />
          <FooterItems
            head="Quick Links"
            first="Login"
            second="About Us"
            third="Contact"
            fourth="Privacy policy"
            fifth="Refund policy"
          />

          <div className="flex flex-col items-start justify-start gap-[40px] h-[366px] min-w-[300px]">
            <div className="text-[24px] text-[#000] font-[700]">Reach Us</div>
            <div className="flex text-[16px] text-[#000] font-[500] gap-[6px]">
              <img src={location} alt="icon" />
              <div>DF-02, Govind Bhawan, IIT Roorkee</div>
            </div>
            <div className="flex text-[16px] text-[#000] font-[500] gap-[6px]">
              <img src={email} alt="icon" />
              <div>shashank@hoardingspace.com</div>
            </div>
            <div className="flex text-[16px] text-[#000] font-[500] gap-[6px]">
              <img src={call} alt="icon" />
              <div>+91 567967608</div>
            </div>
            <div className="flex text-[16px] text-[#000] font-[500] gap-[14px]">
              <img src={facebook} alt="icon" />
              <img src={linkdin} alt="icon" />
              <img src={instagram} alt="icon" />
              <img src={twitter} alt="icon" />
              <img src={youtube} alt="icon" />
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#D9D9D9] my-[12px] " />
        <div className="text-[16px] text-[#000] font-[400] my-[20px]">
          2024 hoarding space All rights reverved
        </div>
      </div>
    </>
  );
};

export default Footer;
