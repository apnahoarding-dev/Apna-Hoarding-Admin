import React from "react";
import Text from "../global/Text";

const SingleItem = (props) => {
  return (
    <div className="flex flex-col gap-[16px] max-w-[60%] border-[1px] px-4 shadow-xl border-t-[#cdcaca] mt-[68px]">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between py-8 ">
          <div className=" text-[24px] font-[400] text-[#000]">
            {props.title}
          </div>
          <div className="flex gap-[12px]  text-[20px] font-[400] text-[#000] cursor-pointer">
            <p>Edit</p>
            <p>Delect</p>
          </div>
        </div>

        <div className="flex justify-between items-center w-full p-[16px] ">
          <img
            className="w-[300px] h-[300px] rounded-md object-cover "
            src={props.img}
            alt="media image"
          />
          <div className="flex flex-col gap-[20px] w-[50%]">
            <div className=" flex justify-between w-full">
              <Text text={props.type} head="Media" />
              <Text text={props.size} head="Size" />
              <Text text={props.illuminate} head="illumination" />
              <Text text={`${props.area} Sq.Ft`} head="Total Area" />
            </div>
            <Text
              text={` ${props.location} , ${props.locality}, ${props.city} , ${props.pincode}`}
              head="Location"
            />
            <div className="text-[12px] font-[400] text-[#000] leading-[20px] text-start ">
              {props.desc}
            </div>
            <div className=" flex justify-between w-full">
              <Text text={` ₹ ${props.monthlyprice}`} head="Monthly" />
              <Text text={` ₹ ${props.perdayprice}`} head="Per Day" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
