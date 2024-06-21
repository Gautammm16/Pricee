import React, { useState } from "react";
import defaultprofile from "../assets/images/default_profile.png";
import { BsFillPersonFill } from "react-icons/bs";
import ProfileView from "../component/profile-view"
import OderHistory from "../component/oderHistory"
import Storenav from "../component/storenav"
const Profile = ({isopen,setisopen}) => {
  const [active,setactive] = useState(1)
  return (
    <>
        <Storenav  isopen={isopen} setisopen = {setisopen}  />
      <div className="flex justify-center">
        <div className="container grid grid-cols-12">
            <div className=" w-full col-span-4 flex justify-end ">
              <div className="mt-10">
              <div className="flex justify-center">
                <img
                  src={defaultprofile}
                  className="w-14 h-14 rounded-full mr-2"
                  alt=""
                  />
              </div>
              <div className="flex justify-center w-full ">

              <div className="">
                <h1 className="font-bold text-3xl flex justify-center">Sumit Patel</h1>
                <h1 className=" text-gray-500 text-base flex justify-center">sp43216@gmail.com</h1>
              </div>
              </div>
              <div className="mt-16">
                <ul>
                  <li className={`text-xl ${active == 1 ? 'text-purple-600' : 'text-stone-400'}   mt-4 font-bold cursor-pointer  `} onClick={()=>setactive(1)}>
                    Personal Information
                  </li>
                  <li className={`text-xl ${active == 2 ? 'text-purple-600' : 'text-stone-400'}   mt-4 font-bold cursor-pointer  `} onClick={()=>setactive(2)}>
                    Order History
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <div className="col-span-6 flex justify-center mt-10">
             {
               active == 1 && 
               <ProfileView/>
              }
                <div className="grid grid-cols-1 h-[38rem] scrollba overflow-scroll scrollbar-hide">
              {

                active == 2 && 
                [...Array(5)].map((e)=>(

                  <OderHistory/>
                ))
              }
              </div>
              <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
