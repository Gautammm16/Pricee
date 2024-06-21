import { FC, useEffect, useState } from "react";
import { Button, DarkThemeToggle, Navbar,Dropdown } from "flowbite-react";
import profile from '../assets/images/default_profile.png'
import Logo from "./logo.png"
const ExampleNavbar: FC = function () {
  
  const [details,setDetails] = useState(null)
  const getDetails = async()=>{
    
      const fetchDetails = await fetch(`${window.path}/getdetails`,{
        method:"get",
        headers:{
          auth:localStorage.getItem("sellerAuth")
        }
      })
      const resp  = await fetchDetails.json()

      if(resp.status == 1){
        setDetails(resp.result)
      }
  }
  useEffect(()=>{
    getDetails()
  },[])
  return (
    <Navbar fluid>
      <div className="w-full p-3 lg:px-5 lg:pl-3 fixed mt-14 z-10 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-5">
            <Navbar.Brand href="http://localhost:3000/" className="py-5 cursor-pointer">
              <img alt="" src={Logo} onClick={()=>window.open("http://localhost:3000/")} className="mr-3 h-24 w-40 object-cover  sm:h-8" />
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
          
          <Dropdown label={<div className="bg-gray-400 w-12 h-12 rounded-full overflow-hidden"> < img  src={profile} className="ouline-none "/> </div>} trigger="hover" className="bg-none" style={{background:"none",border:"none"}} >
         <Dropdown.Header>
         <span className="block text-sm">
        {details?.name}
            </span>
          <span className="block truncate text-sm font-medium">
           {details?.email}
           </span>
                </Dropdown.Header>
                
                <Dropdown.Divider />
                <Dropdown.Item onClick={()=>{
                  localStorage.setItem("sellerAuth","")
                  window.location.reload(false)
                }}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
