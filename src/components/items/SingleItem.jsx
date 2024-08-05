import React from "react";
import Text from "../global/Text";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { toast } from "react-toastify";
import DeleatIcon from "../../assets/deleat.svg";
import EditIcon from "../../assets/Edit.svg";

const SingleItem = (props) => {
  const navigate = useNavigate();

  const DeleatItem = async (id) => {
    try {
      await deleteDoc(doc(db, "CompleteItems", id));
      toast.success("Item deleated successfully");
      // setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-[16px] w-[60%] border-[1px] px-4 shadow-xl border-t-[#cdcaca] mt-[68px]">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between py-8 ">
          <div className=" text-[24px] font-[400] text-[#000]">
            {props.title}
          </div>
          <div className="flex items-center gap-[12px]  text-[20px] font-[400] text-[#000] cursor-pointer">
            {/* <p
              onClick={() => {
                navigate(`/${props.id}`);
              }}
            >
              Edit
            </p> */}

            <img
              className="h-[45px] w-[45px]"
              src={EditIcon}
              onClick={() => {
                navigate(`/${props.id}`);
              }}
              alt="edit"
            />
            <img
              className="h-[30px] w-[30px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 "
              src={DeleatIcon}
              onClick={() => {
                DeleatItem(props.id);
                navigate("/addItem");
                // setLoading(true);
              }}
              alt="edit"
            />
            {/* <p
              onClick={() => {
                DeleatItem(props.id);
                // setLoading(true);
              }}
            >
              Delect
            </p> */}
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
