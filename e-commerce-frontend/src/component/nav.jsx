
import React, { useState } from 'react'
import { Dropdown, Navbar } from 'rsuite';
import logo from "../assets/images/pricee.png"
import Cart from "./cart"
const nav = () => {
  
  return (
    <>

      
    <div class="text-center sm:text-left"></div>
    <div class="md:max-xl:flex"></div>
    <div className='justify-between px-1 ml-10 mt-3 lg:max-w-7xl md:items-center md:flex md:px-0 border-b '>
    
    <img src={logo} alt="xx" />
    <Dropdown title="APPLIANCES" trigger='hover' className='ml-20' >
      <div className='bg-white mt-3 absolute left-44 border-b border-l border-r px-5 grid  '>
        <div className='grid grid-cols-4 gap-x-10 gap-y-8 mt-3 mb-3'>

      

    {
      [...Array(15)].map((e)=>(
        <Dropdown.Item >New File with Current Profile</Dropdown.Item>
        ))
      }
      </div>

     
      </div>

    </Dropdown>
   
    
    <Dropdown title="ELECTRONICS" trigger='hover' className='ml-3'>
    <div className='bg-white mt-3 absolute left-44 border-b border-l border-r px-5 grid  '>
        <div className='grid grid-cols-4 gap-x-10 gap-y-8 mt-3 mb-3'>

      

    {
      [...Array(15)].map((e)=>(
        <Dropdown.Item >New File with Current Profile</Dropdown.Item>
        ))
      }
      </div>

     
      </div>
      
      </Dropdown>


    <Dropdown title="GROCERY & GOURMET FOOD" trigger='hover' className='ml-3'>
    <div className='bg-white mt-3 absolute border-b border-l border-r px-5 grid  '>
        <div className='grid grid-cols-4 gap-x-10 gap-y-8 mt-3 mb-3'>

      

    {
      [...Array(15)].map((e)=>(
        <Dropdown.Item >New File with Current Profile</Dropdown.Item>
        ))
      }
      </div>

     
      </div>
      </Dropdown>
      
      

    <Dropdown title="PERSONAL CARE" trigger='hover' className='ml-3'>
    <div className='bg-white mt-3 absolute border-b border-l border-r px-5 grid  '>
        <div className='grid grid-cols-4 gap-x-10 gap-y-8 mt-3 mb-3'>

      

    {
      [...Array(15)].map((e)=>(
        <Dropdown.Item >New File with Current Profile</Dropdown.Item>
        ))
      }
      </div>

     
      </div>
      </Dropdown>
      
      

    <Dropdown title="POPULAR BRANDS" trigger='hover' className='ml-3'>
         <div className='bg-white mt-3 absolute border-b border-l border-r px-5 grid  '>
        <div className='grid grid-cols-4 gap-x-10 gap-y-8 mt-3 mb-3'>

      

    {
      [...Array(15)].map((e)=>(
        <Dropdown.Item >New File with Current Profile</Dropdown.Item>
        ))
      }
      </div>

     
      </div>
      </Dropdown>

      <div className="flex ml-10 ">
          <input
              type="text"
              className="block w-full px-4 py-2  text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-600 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
          />
          <button className="px-4 text-white bg-purple-600 rounded-full ml-3 ">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
              </svg>
          </button>
      </div>
  </div>
 

  
  </>
  )}
export default nav