import React, { useEffect, useState } from 'react'
import { useLocation,useParams } from 'react-router-dom'
import Storenav from "../component/storenav"
const Singleproduct = ({isopen,setisopen}) => {
  const [data,setData ] = useState(null)
  const location = useLocation()
  const param = useParams()
  const getProductData = async()=>{
    const fetchdata = await fetch(`${window.path}/getsingleproduct/${param.id}`,{
      method:"get"
    })
    const  resp = await fetchdata.json()
    // console.log(resp)
    if(resp.status == 1){
      setData(resp.result)
    }
  }
  useEffect(()=>{
    getProductData()
  },[])

  return (

    <>
    <Storenav  isopen={isopen} setisopen = {setisopen}/>
    {
      data != null ?
      <div class="antialiased ">

      
      <div class="py-6">
      
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div x-data="{ image: 1 }" x-cloak>
                <div class="h-64 md:h-80 rounded-lg bg-white mb-4">
                  <div  class="h-64  md:h-80 rounded-lg  mb-4 flex items-center justify-center">
                    <img class="text-5xl"  src={data.image} />
                  </div>
                <div className='flex'>
                  <div className=' cursor-pointer w-36 h-36 bg-gray-400'>
                    <span className=' w-20 '>s</span>
                  </div>
                  <div className=' w-36 h-36 ml-6 cursor-pointer bg-gray-400'>
                    <span className='w-20 '>s</span>
                  </div>
                  <div className=' w-36 h-36 ml-6 cursor-pointer bg-gray-400'>
                    <span className='w-20 '>s</span>
                  </div>
                 

                 
                </div>
                  
                </div>
      
                <div class="flex -mx-2 mb-4">
                  <template x-for="i in 4">
                    <div class="flex-1 px-2">
                      {/* <button x-on:click="image = i" class="{ 'ring-2 ring-indigo-300 ring-inset': image === i }" class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center">
                        <span x-text="i" class="text-2xl"></span>
                      </button> */}
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{data.title}</h2>
              <p class="text-gray-500 text-sm">By <a href="#" class="text-indigo-600 hover:underline">{data.detail.map((e)=>{return e.brand})}</a></p>
      
              <div class="flex items-center space-x-4 my-4">
                <div>
                  <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span class="text-indigo-400 mr-1 mt-1"></span>
                    <span class="font-bold text-indigo-600 text-3xl">{data.price}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-green-500 text-xl font-semibold">Save 12%</p>
                  <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                </div>
              </div>
      
              <p class="text-gray-500">Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.</p>
      
              <div class="flex py-4 space-x-4">
                <div class="relative">
                  <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                  <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
      
                  <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
      
                <button type="button" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                  Add to Cart
                </button>
              </div>
              <table class="items-center w-full border-collapse text-blueGray-700  ">
          <thead class="thead-light ">
            <tr>
              <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                General
              </th>
              
              <th class="px-6 bg-blueGray-50 text-blueGray-700 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
            </tr>
          </thead>
          <tbody>
            {
              data?.detail?.map((e)=>(

                <tr>
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {Object.keys(e)}
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                {Object.values(e)}
              </td>
             
             
            </tr>
              ))
              }
        
           
          
           
          </tbody>
        </table>
            </div>
          </div>
        </div>
      </div>
        </div>
 :
  <h2>No product Found</h2>
  
  }

</>


  )
}

export default Singleproduct