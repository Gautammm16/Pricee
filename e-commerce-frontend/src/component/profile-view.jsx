import React, { useEffect, useState } from 'react'
import { City,State,Country } from 'country-state-city';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileView = () => {
  const [profileData,setProfileData] = useState()
  const getProfileData = async () =>{
    const fetchdata = await fetch(`${window.path}/getuserdetails`,{
      method:"get",
      headers:{
        auth:localStorage.getItem("auth")
      }
    })
    const resp = await fetchdata.json()
    console.log(resp)
    if(resp.status == 1){
      setProfileData(resp.result)
    }
  
  }
  const handleUpdate = async(e)=>{
    e.preventDefault()
      const formdata = new FormData()
       formdata.append("data",JSON.stringify(profileData))
       const fetchdata = await fetch(`${window.path}/updateuser`,{
        method:"post",
        body:formdata,
        headers:{
          auth:localStorage.getItem("auth")
        }
       })
       const resp = await fetchdata.json()
       console.log(resp)
       if(resp.status == 1){
          toast.success("Profile Updated Successfully",{
            autoClose:800,
            theme:"light",
            position:"top-center"
          })
       }else{
        toast.error("Unable to Process Please Try Again",{
          autoClose:800,
          theme:"light",
          position:"top-center"
        })
       }
  }
  const stateopt = State.getStatesOfCountry("IN").map((e)=>{
    return ({label:e.name,value:e.isoCode})
  })
  useEffect(()=>{
    getProfileData()
  },[])
  return (
    <form class="w-full max-w-lg">
    {
      profileData != null &&
    <>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          User Name
        </label>
        <input value={profileData?.full_name} onChange={(e)=>{setProfileData({...profileData,full_name:e.target.value})}} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Email" />
      
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Email
        </label>
        <input value={profileData?.email}    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Email" />
      
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Address
        </label>
        <input onChange={(e)=>{setProfileData({...profileData,address1:e.target.value})}} value={profileData.address1} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Address" />
      
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          City
        </label>
        <input  onChange={(e)=>{setProfileData({...profileData,city:e.target.value})}} value={profileData.city} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
      </div>
      <ToastContainer/>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
          State
        </label>
        <div class="relative">
          <select  onChange={(e)=>{setProfileData({...profileData,state:e.target.value})}}  value={profileData.state} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            {
              stateopt?.map((e)=>(
                <option value={e.label}>{e.label}</option>
                ))
            }
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
          Zip
        </label>
        <input onChange={(e)=>{setProfileData({...profileData,postal_code:e.target.value})}} value={profileData.postal_code} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mt-7 mb-6">
      <div class="w-full px-3">
        <button onClick={handleUpdate} className='appearance-none block w-full bg-gradient-to-r from-green-400 to-green-700  text-white font-bold text-lg border border-gray-200 rounded py-3 px-4 mb-3 leading-tight'>SAVE</button>
        {/* <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="button" placeholder="Email" /> */}
      
      </div>
    </div>
          </>
        
      }
      </form  >
  )
}

export default ProfileView