import React,{useEffect,useState} from 'react'
import Storenav from "../component/storenav"
import {CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import {IoMdArrowBack}  from "react-icons/io"
import { City,State,Country } from 'country-state-city';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({isopen,setisopen}) => {
  const [product,setproduct] = useState(null)
  const navigate = useNavigate()
    const strip = useStripe()
  const element = useElements()
  const [inputData,setInputData] = useState({
    email:"",
    cardHolder :"",
    address :"",
    state:"",
    shippingMethod:"radio_1",
    zip:'',
    country:{label:"india",value:"IN"},
  
  }) 

  const stateopt = State.getStatesOfCountry(inputData.country.value).map((e)=>{
    return ({label:e.name,value:e.isoCode})
  })
const inputHandle = (e) =>{

}

   const handlePayment = async() =>{

   
    if(!localStorage.getItem("auth")){
      return toast.error("You Have To Login First !",{
        autoClose:800,
        progress:false,
        position:"top-center"
      }) 
    }
    if(inputData.email.length == 0){
      return toast.error(" Please Fill All Field!",{
        autoClose:800,
        progress:false,
        position:"top-center"
      }) 
    }
    if(inputData.cardHolder.length == 0){
      return toast.error(" Please Fill All Field!",{
        autoClose:800,
        progress:false,
        position:"top-center"
      }) 
    }
    if(inputData.address.length == 0){
      return toast.error(" Please Fill All Field!",{
        autoClose:800,
        progress:false,
        position:"top-center"
      }) 
    }
    if(inputData.zip.length == 0){
      return toast.error(" Please Fill All Field!",{
        autoClose:800,
        progress:false,
        position:"top-center"
      }) 
    }
    const {error,paymentMethod} = await strip.createPaymentMethod({
        type:"card",
        card:element.getElement(CardElement)
    })
    if(!error){
        const formdata = new FormData()
        formdata.append("amount",product != null && 
        ( product.reduce(function(tot, arr) { 
          return parseInt(tot) + (parseInt(arr.product.discounted_price) * parseInt(arr.quantity))
        },0)+
        
        (inputData.shippingMethod == "radio_1"? 199 : 0)).toLocaleString()
        )
        formdata.append("id",paymentMethod.id)
        formdata.append("email",inputData.email)
        formdata.append("card_holder",inputData.cardHolder)
        formdata.append("address",inputData.address)
        formdata.append("state",inputData.state)
        formdata.append("zip",inputData.zip)
        formdata.append("product_data",JSON.stringify(product))
        
        const fetchpayment = await fetch(`${window.path}/userpayment`,{
          headers:{
            auth:localStorage.getItem("auth")
          },
            method:"post",
            body:formdata
        })
        const resp = await fetchpayment.json()
        if(resp.status == 1){
          localStorage.setItem("cart",'')
          toast.success("order confirmed Successfully",{
            autoClose:800,
            position:"top-center"
          })
          setTimeout(()=>{
            navigate("/")
          },800)
        }
    }else{
      toast.error("Please Fill All Field",{
        autoClose:800,
        position:"top-center"
      })
    }
}
  const fetchproduct = async() =>{
   
      if(localStorage.getItem("cart")){
        const cart_data = JSON.parse(localStorage.getItem("cart") || "[]")

        const formdata = new FormData()

          formdata.append("data",JSON.stringify(cart_data))
        const fetchproduct = await fetch(`${window.path}/getcartforlocalstorage`,{
          method:'post',
          body:formdata
        })
        const resp  = await fetchproduct.json()
        if(resp.status == 1){
          setproduct(resp.result)
        }else{
          setproduct(null)
        }
      }
    
  }
 
  useEffect(()=>{
    fetchproduct()
  },[])
  return (
   <>
    <>
    <div className=' w-full flex justify-center mt-9 '>
      <div className='container  flex justify-between' >
      <span className='ml-16 cursor-pointer' onClick={()=>{navigate("/")}}>
        Home
      <IoMdArrowBack/>
        </span>

      </div
      >
      {
        !localStorage.getItem("auth") &&
        <Link className='mr-12 hover:underline text-blue-700' to="/auth/signin">
        Login here
        </Link>
      }

    {/* <Storenav  isopen={isopen} setisopen = {setisopen}/> */}
    </div>
    <div className='flex justify-center  ' >
<div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32   ">
  <div class="px-4 pt-8">
    <ToastContainer/>
    <p class="text-xl font-medium">Order Summary</p>
    <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        
      {
         product != null &&
         product.map((e,i)=>(

           <div class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={e.product.images[0]} alt="" />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-semibold flex justify-between">{e.product.name}
          <button
                                        type="remove"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={()=>{
                                          
                                            let data = [...JSON.parse(localStorage.getItem("cart")|| [])];
                                            data.splice(i, 1)
                                            localStorage.setItem('cart',JSON.stringify(data))
                                          fetchproduct()               
                                        }}
                                      >
                                        Remove
                                      </button>
          </span>
          <div className='flex justify-between'>
          <span class=" text-gray-400 ">
            {e.product.brand}</span>
            <span>
            <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-5">
    <button data-action="decrement" 
     onClick={()=>{
      let data = [...JSON.parse(localStorage.getItem("cart")|| [])];
      data.map((f,i)=>{
        if(f.id == e.product._id  ){
          if(parseInt(f.q)>1)
            data[i].q = parseInt(data[i].q)-1
        }
      })
      localStorage.setItem('cart',JSON.stringify(data))
    fetchproduct()  
    }}
    class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
      <span class="m-auto text-2xl font-thin"
     
      >−</span>
    </button>
    <h1 type="number" class="outline-none focus:outline-none text-center w-16 border-none bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center justify-center text-gray-700  outline-none" name="custom-input-number" >{e.quantity}</h1>
  <button data-action="increment"
   onClick={()=>{
    let data = [...JSON.parse(localStorage.getItem("cart")|| [])];
    data.map((f,i)=>{
      if(f.id == e.product._id ){
          data[i].q = parseInt(data[i].q)+1
      }
    })
    localStorage.setItem('cart',JSON.stringify(data))
  fetchproduct()  
  }}
   class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
    <span class="m-auto text-2xl font-thin"
   
    >+</span>
  </button>
</div>
            </span>
          </div>
          <p class="text-lg font-bold">₹ {parseInt(e.product.discounted_price).toLocaleString()}</p>
        </div>
      </div>
        ))
    }
    </div>
    
    <p class="mt-8 text-lg font-medium">Shipping Methods</p>
    <form class="mt-5 grid gap-6">
      <div class="relative ">
        <input class="peer hidden" id="radio_1" type="radio" name="radio" checked={inputData.shippingMethod == "radio_1"?true :false}  onClick={(e)=>{setInputData({...inputData , shippingMethod : e.target.id})}} />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img class="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div class="ml-5 ">
            <span class="mt-2 font-semibold">Pricee Delivery (By Air)</span>
            <p class="text-slate-500 text-sm leading-6">Delivery: 1-2  Bussiness Days</p>
          </div>
        </label>
      </div>
      <div class="relative">
        <input class="peer hidden" id="radio_2" type="radio" name="radio"  checked={inputData.shippingMethod == "radio_2"? true :false}  onClick={(e)=>{setInputData({...inputData , shippingMethod : e.target.id})}} />
        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img class="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
          <div class="ml-5">
            <span class="mt-2 font-semibold">Free Delevery</span>
            <p class="text-slate-500 text-sm leading-6">Delivery: 7-8 Days</p>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p class="text-xl font-medium">Payment Details</p>
    <p class="text-gray-400">Complete your order by providing your payment details.</p>
    <div class="">
      <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div class="relative">
        <input type="text" id="email"  value={inputData.email} onChange={(e)=>{setInputData({...inputData,email:e.target.value})}}  name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
        <div class="pointer-events-none  absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
      <div class="relative">
        <input type="text" id="card-holder" value={inputData.cardHolder} onChange={(e)=>{setInputData({...inputData,cardHolder:e.target.value})}} name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
      </div>
      <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Card Details</label>
      <div class="flex">
        <div class="relative bg-white flex-shrink-0 w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 ">
            <CardElement options={{}} className="bg-white w-full"  />
        </div>
      </div>
      <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
      <div class="flex flex-col sm:flex-row">
        <div class="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address"  value={inputData.address} onChange={(e)=>{setInputData({...inputData,address:e.target.value})}} class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
          <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img class="h-4 w-4 object-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="" />
          </div>
        </div>
        <select type="text" name="billing-state"   onChange={(e)=>{setInputData({...inputData,state:e.target.selectedOptions[0].label});}}  class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
          
          {
            stateopt?.map((e)=>(

              <option value={e.value}>{e.label}</option>
            ))
          }
        </select>
        <input type="text" name="billing-zip" value={inputData.zip} onChange={(e)=>{setInputData({...inputData,zip:e.target.value})}} class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
      </div>

    
      <div class="mt-6 border-t border-b py-2">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Subtotal</p>
          <p class="font-semibold text-gray-900">
          ₹ {
            product != null &&
                         ( product.reduce(function(tot, arr) { 
                            // return the sum with previous value
                            return parseInt(tot) + (parseInt(arr.product.discounted_price) * parseInt(arr.quantity))
                          
                            // set initial value as 0
                          },0)).toLocaleString()
                          }
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Shipping</p>
          <p class="font-semibold text-gray-900">
            {
              inputData.shippingMethod == "radio_1" ?
            "₹ 69"
            :0
            }
            </p>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">Total</p>
        <p class="text-2xl font-semibold text-gray-900">
        ₹ {
            product != null &&
                          ( product.reduce(function(tot, arr) { 
                            // return the sum with previous value
                            return parseInt(tot) + (parseInt(arr.product.discounted_price) * parseInt(arr.quantity))
                          
                            // set initial value as 0
                          },0)+
                          
                          (inputData.shippingMethod == "radio_1"? 69 : 0)).toLocaleString()
                          }
        </p>
      </div>
    </div>
    <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handlePayment}>Place Order</button>

  </div>
</div>
</div>
</>
   </>
  )
}


export default Checkout