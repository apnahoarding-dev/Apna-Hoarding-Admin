import React, { useState, useEffect } from "react";
import Text from "../global/Text";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// import { onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../../firebase.config";
import { toast } from "react-toastify";
import Header from "../global/Header";
// import { ClipLoader } from "react-spinners";

const EditItem = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  let [color, setColor] = useState("#ffba08");
  //   let [loading, setLoading] = useState(false);

  // ---> hooks for update data
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [locality, setLocality] = useState("");

  const [city, setCity] = useState("");
  const [desc, setDesc] = useState("");
  const [pincode, setPincode] = useState(0);
  const [size, setSize] = useState("");
  const [illuminate, setIlluminate] = useState("");
  const [area, setArea] = useState("");
  const [monthlyprice, setMonthlyprice] = useState("");
  const [perdayprice, setPerdayprice] = useState("");
  const [discount, setDiscount] = useState();
  const [discountPerc, setDiscountPerc] = useState();
  const [img, setImg] = useState({});
  // ---->

  const [file, setfile] = useState("");
  const [perc, setPerc] = useState(null); // upload percent state

  // uplaod image--->
  useEffect(() => {
    const UploadImage = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // setdata((prev) => ({ ...prev, img: downloadURL }));
            setImg(downloadURL);
          });
        }
      );
    };
    file && UploadImage();
  }, [file]);

  //---->
  const { id } = useParams(); //param got id from url so url change first then we grab id from useparams
  console.log("this is params id ", id);

  useEffect(() => {
    const SingleData = async () => {
      //   setLoading(true);

      const docRef = doc(db, "CompleteItems", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // setdata(docSnap.data());

        const itemData = docSnap.data();
        // setData(itemData);
        setTitle(itemData.title);
        setType(itemData.type);
        setLocation(itemData.location);
        setLocality(itemData.locality);
        setCity(itemData.city);
        setDesc(itemData.desc);
        setPincode(itemData.pincode);
        setSize(itemData.size);
        setIlluminate(itemData.illuminate);
        setArea(itemData.area);
        setMonthlyprice(itemData.monthlyprice);
        setPerdayprice(itemData.perdayprice);

        setDiscount(itemData.discount);
        setDiscountPerc(itemData.discountPerc);

        //
        setdata(itemData);
      } else {
        console.log("No such document!");
        return null;
      }
      //   setLoading(false);
    };
    SingleData();
  }, [id]);

  //   const [user, setuser] = useState({});

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (currentuser) => {
  //       setuser(currentuser);
  //     });
  //   }, []);

  const UpdateItems = async () => {
    try {
      const washingtonRef = doc(db, "CompleteItems", id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        title: title,
        type: type,
        location: location,
        locality: locality,
        city: city,
        desc: desc,
        pincode: pincode,
        size: size,
        area: area,
        illuminate: illuminate,
        monthlyprice: monthlyprice,
        perdayprice: perdayprice,
        img: img,
      });
      toast.success("Item Updated Successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex w-full justify-center mt-[24px]  mb-[98px] ">
          <div className="flex flex-col items-center gap-[32px] p-[16px]">
            <div className="flex flex-col gap-[32px] py-[24px] px-[64px] border-2 rounded-xl ">
              {/*  */}
              <div className="flex justify-center  items-center  w-full">
                <div className="text-[32px] text-[#333] font-[600]">
                  Create Advertisement
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Title
                </div>
                <input
                  className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="text"
                  //   placeholder="eg- Digital Screen at Elevation..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={data.title}
                  required
                />
              </div>

              {/*  */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Hoarding Type{" "}
                </div>
                <input
                  className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="text"
                  //   placeholder="eg- Billboard "
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder={data.type}
                  required

                  // value={type}
                />
              </div>
              {/*  */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Location
                </div>
                <input
                  className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="text"
                  //   placeholder="eg- IBC Pipload "
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={data.location}
                  required
                  // value={location}
                />
              </div>
              {/*  */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Locality
                </div>
                <input
                  className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="text"
                  placeholder={data.locality}
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  required
                  // value={location}
                />
              </div>
              {/*  */}

              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  City{" "}
                </div>
                <input
                  className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="text "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={data.city}
                  required
                  //   placeholder="eg- Mumbai  "

                  // value={price}
                />
              </div>
              {/*  */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Description
                </div>
                <input
                  className="min-h-[120px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pb-[38px] px-[12px] "
                  type="number "
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  //   placeholder="About the hoarding in detail... "
                  value={desc}
                  placeholder={data.desc}

                  // value={price}
                />
              </div>

              {/* ---> */}
              <div className="flex justify-between w-full ">
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Area Pincode{" "}
                  </div>
                  <input
                    className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    // placeholder="789XXX "
                    placeholder={data.pincode}

                    // value={price}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Area(in Sq.ft)
                  </div>
                  <input
                    className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={data.area}
                    required
                    // placeholder="eg- 436"

                    // value={price}
                  />
                </div>
              </div>
              {/* ---> */}

              <div className="flex justify-between w-full ">
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    illumination{" "}
                  </div>
                  <input
                    className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="text"
                    value={illuminate}
                    onChange={(e) => setIlluminate(e.target.value)}
                    placeholder={data.illuminate}
                    required
                    // placeholder="eg- Ledscreen "

                    // value={price}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Size
                  </div>
                  <input
                    className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder={data.size}
                    required
                    // placeholder="eg- 8x15"

                    // value={price}
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex justify-between w-full ">
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Monthly Price
                  </div>
                  <input
                    className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={monthlyprice}
                    onChange={(e) => setMonthlyprice(e.target.value)}
                    placeholder={data.monthlyprice}
                    required
                    // placeholder="eg- 27500 "

                    // value={price}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Per Day Price
                  </div>
                  <input
                    className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={perdayprice}
                    onChange={(e) => setPerdayprice(e.target.value)}
                    placeholder={data.perdayprice}
                    required
                    // placeholder="eg- 950"

                    // value={price}
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex justify-between w-full ">
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Discount
                  </div>
                  <input
                    className="h-[56px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                    placeholder="eg- 27500 "

                    // value={price}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-start">
                  <div className="text-[16px] text-[#666666] font-[400]">
                    Discount %
                  </div>
                  <input
                    className="h-[56px]  border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                    type="number "
                    value={discountPerc}
                    onChange={(e) => setDiscountPerc(e.target.value)}
                    required
                    placeholder="eg- 10"

                    // value={price}
                  />
                </div>
              </div>

              {/* -----> more input fields */}
              <div className="flex flex-col gap-[8px] items-start">
                <div className="text-[16px] text-[#666666] font-[400]">
                  Upload Image{" "}
                </div>
                <input
                  //   className="h-[56px] min-w-[580px] border-[1px] rounded-[4px] border-[#66666659] pl-[12px] "
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                  //   value={data.img}
                />
              </div>
              <div className="flex justify-between w-full">
                <div
                  className="text-[26px] text-[#626060]   font-semibold pr-8 cursor-pointer hover:text-[#313131]"
                  onClick={() => navigate("/allitem")}
                >
                  Back
                </div>
                <button
                  disabled={perc != null && perc < 100}
                  onClick={() => {
                    UpdateItems();
                    navigate("/allitem");
                  }}
                  className=" text-[18px] text-[#FFF] bg-[#B88E2F] hover:bg-[#a37c20] w-[150px] rounded-xl font-[600] p-[16px] cursor-pointer disabled:bg-[#dbbb6f]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
