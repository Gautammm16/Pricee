import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { City,State,Country } from 'country-state-city';
import Select from 'react-select';
import image from "../../assets/images/signup.jpg"
import image2 from "../../assets/images/signup2.jpg"
import image3 from "../../assets/images/signup3.jpg"
import image4 from "../../assets/images/signup4.jpg"
import image5 from "../../assets/images/signup5.jpg"
import image6 from "../../assets/images/signup6.jpg"
import image7 from "../../assets/images/signup7.jpg"
import image8 from "../../assets/images/signup8.jpg"
import image9 from "../../assets/images/signup9.jpg"
function App() {
  const formArray = [1, 2, 3, 4];
  const imgeArray= [image,image2,image3,image4,image5,image7,image8,image9,image]
  
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: '',
    email: '',
    bussiness_name: '',
    password: '',
    cpassword: '',
    pan:'',
    adhar:'',
    gstn:'',
    houseno:'',
    area:'',
    country:{label:"india",value:"IN"},
    state:'',
    city:'',


  })
    const country = Country.getAllCountries()
    const stateopt = State.getStatesOfCountry(state.country.value).map((e)=>{
      return ({label:e.name,value:e.isoCode})
    })
    const cityopt = City.getCitiesOfCountry(state.country.value).map((e)=>{
      return ({label:e.name,value:e.isoCode})
    })
    const countryOpt = country?.map((e)=>{
     
      return ({label:e.name,value:e.isoCode})
    })
  const [formNo, setFormNo] = useState(localStorage.getItem("signupform"))
 
  const [otp,setotp] = useState({
    first:"",
    second:"",
    third:"",
    fourth:"",
    fifth:"",
    sixth:"",
  })
  const otphandle = (e) =>{
    setotp({...otp,[e.target.name]:e.target.value})
  }
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const next = async() => {

        if(formNo==1 ){
          localStorage.setItem("signupform",1)
          if(state.name == ""){
            toast.error('Please Fill Name',{
              autoClose:600,
              progress:false,
              position:"top-center"
            })
            return
          }
          const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
          if(validateEmail(state.email)){
        
          }
          else{
              toast.error("please fill Email Properly",{
                  autoClose:200,
                  progress:false,
                  theme:"light",
              })
              return
          }
          if(state.bussiness_name.length == 0 && /\d/.test(state.bussiness_name)){
            toast.error("please fill Bussiness Properly",{
              autoClose:200,
              progress:false,
              theme:"light",
          })
          return
          }
          if(state.password.length <8){
            toast.error("Password Length Must be 8 character",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        } 
        if(state.cpassword.length <8){
            toast.error("confirm Password Length Must be 8 character",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return  
        }
        if(state.password != state.cpassword  ){
            toast.error("Password are not matching",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        }
        setFormNo(parseInt(formNo) + 1)
            
            
        }
        else if (formNo == 2){
          localStorage.setItem("signupform",2)
          if(state.gstn.length == 0){
            toast.error("Please fill House Address",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        } 
        if(state.pan.length == 0){
          toast.error("Please fill Area",{
              autoClose:200,
              progress:false,
              theme:"light",
          })
          return
      } 
      if(state.adhar.length == 0){
        toast.error("Please fill House Address",{
            autoClose:200,
            progress:false,
            theme:"light",
        })
        return
    } 
          setFormNo( parseInt(formNo) + 1)
        }
        else if(formNo==3){
          localStorage.setItem("signupform",3)
        
          if(state.houseno.length == 0){
            toast.error("Please fill House Address",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        } 
        if(state.area.length == 0){
          toast.error("Please fill Area",{
              autoClose:200,
              progress:false,
              theme:"light",
          })
          return
      } 
      if(state.state.length == 0){
        toast.error("Please fill House Address",{
            autoClose:200,
            progress:false,
            theme:"light",
        })
        return
    } 
    if(state.country.length == 0){
      toast.error("Please fill Area",{
          autoClose:200,
          progress:false,
          theme:"light",
      })
      return
  } 
  if(state.city.length == 0){
    toast.error("Please fill Area",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
} 
          const formdata = new FormData()
            formdata.append("name",state.name)
            formdata.append("email",state.email)
            formdata.append("bussiness_name",state.bussiness_name)
            formdata.append("password",state.password)
            formdata.append("gstn",state.gstn)
            formdata.append("adhar_no",state.adhar)
            formdata.append("pan_no",state.pan)
            formdata.append("houseno",state.houseno)
            formdata.append("area",state.area)
            formdata.append("state",state.state.label)
            formdata.append("country",state.country.label)
            formdata.append("city",state.city.label)
            const fetchdata = await  fetch(`${window.path}/register`,{
              method:"post",
              body:formdata
            })
            const resp = await fetchdata.json()
            console.log(resp)
            if(resp.status == 1){

              setFormNo(formNo + 1)

            }
        }
        else if(formNo == 4){
          localStorage.setItem("signupform",4)
          if(
            otp.first.length == 0 ||
            otp.second.length == 0||
            otp.third.length == 0 ||
            otp.fourth.length == 0||
            otp.fifth.length == 0 ||
            otp.sixth.length == 0 
             ){
               toast.error("Enter Otp!",{
                 autoClose:200,
                 progress:false,
                 theme:"light",
             })
             return
             }
             const formdata = new FormData()
          formdata.append("otp",otp.first +  otp.second + otp.third  + otp.fourth + otp.fifth  + otp.sixth )
          formdata.append("email",state.email)
          const fetchdata = await  fetch(`${window.path}/confirmotp`,{
            method:"post",
            body:formdata
          })
          const resp = await fetchdata.json()
          console.log(resp)
         
          if(resp.status == 1){

            setFormNo(formNo + 1)
            localStorage.setItem("signupform",4)
            navigate("/authentication/sign-in")
          }
          else if(resp.status == -1) {
            toast.error("Please fill House Address",{
              autoClose:200,
              progress:false,
              theme:"light",
          })
          }
          
        }
  
  }
 
  const pre = () => {
    if(formNo != 1){

      setFormNo(formNo - 1)
    }
  }
  const finalSubmit = () => {
    if (state.district && state.thana && state.post) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }
  return (
    <> 
    <div className='absolute w-full'>
    <h1 className='  flex justify-center mt-10 text-4xl'>Sign Up</h1>
    </div>
    <div className="w-screen h-screen ">
    <div className='bg-slate-300 flex justify-center items-center h-full '>

    
      <ToastContainer />
      <div className='h-[35rem]'>
        <img src={image2} alt="" className='h-full' />
      </div>
      <div className="card w-[500px]  bg-white p-5">
        <div className='flex justify-center items-center'>
          {

            formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo>=v ? 'bg-blue-500 ' : 'bg-gray-400'} h-[35px] flex justify-center items-center`}>
              {v}
            </div>
              {
                i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              }
            </>)
          }
        </div>
        {
          formNo == 1 && 
        <>
        
          <div>
              <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
              >
                  Name
              </label>
              <div className="flex flex-col items-start">
                  <input
                      type="text"
                      name="name"
                      onChange={inputHandle}
                      value={state.name}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
              </div>
          </div>
          <div className="mt-4">
              <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
              >
                  Email
              </label>
              <div className="flex flex-col items-start">
                  <input
                      type="email"
                      name="email"
                      onChange={inputHandle}
                      value={state.email}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
              </div>
          </div>
          <div className="mt-4">
              <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
              >
                  Bussiness Name
              </label>
              <div className="flex flex-col items-start">
                  <input
                      type="email"
                      name="bussiness_name"
                      onChange={inputHandle}
                      value={state.bussiness_name}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
              </div>
          </div>
          <div className="mt-4">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
              >
                  Password
              </label>
              <div className="flex flex-col items-start">
                  <input
                      type="password"
                      name="password"
                      onChange={inputHandle}
                      value={state.password}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
              </div>
          </div>
          <div className="mt-4">
              <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
              >
                  Confirm Password
              </label>
              <div className="flex flex-col items-start">
                  <input
                      type="password"
                      name="cpassword"
                      onChange={inputHandle}
                      value={state.cpassword}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
              </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            
              <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
    </>
        }
       

        {
          formNo == 2 && <div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="varsity">GSTN</label>
              <input value={state.gstn} name="gstn" onChange={inputHandle}   className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="text"  placeholder='varsity name' id='varsity' />
            </div>
            
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="session">PAN No.</label>
              <input value={state.pan} name="pan" onChange={inputHandle}   className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="text"  placeholder='session' id='session' />
            </div>
            <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="address">Adhar No.</label>
              <input value={state.adhar} name="adhar" onChange={inputHandle}   row='10' className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="number"  placeholder='address' ></input>
            </div>
            <div className="flex items-center justify-end mt-4">
            
              <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
          </div>
        }

        {
          formNo == 3 && <div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="district">House No.</label>
              <input value={state.houseno} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='houseno' placeholder='district name' id='district' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="thana">Area </label>
              <input value={state.area} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='area' placeholder='Area' id='thana' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="post">Country</label>
              <Select value={state.country}  options={countryOpt} onChange={(e)=>{setState({...state,country:e})}} className='p-2  mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='state' placeholder='country' id='post' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="post">State</label>
              <Select value={state.state}  options={stateopt} onChange={(e)=>{setState({...state,state:e})}} className='p-2  mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='state' placeholder='state' id='post' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="post">City</label>
              <Select value={state.city}  options={cityopt} onChange={(e)=>{setState({...state,city:e})}} className='p-2  mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='state' placeholder='city' id='post' />
            </div>
          
          
            <div className="flex items-center justify-end mt-4">
            
              <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
          </div>
        }
 {
             formNo == 4 &&  
             <div>

             
             <div class="  py-3 rounded text-center">
             <h1 class="text-2xl font-bold">OTP Verification</h1>
             <div class="flex flex-col mt-4">
                 <span>Enter the OTP you received at</span>
                 <span class="font-bold">{state?.email.length > 0 ? state.email.slice(0,1) + "*****"+ state.email.slice(state.email.length - 4 , state.email.length ) :""}</span>
             </div>
             
             <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='first'   value={otp.first} onChange={otphandle} id="first" maxlength="1" /> 
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='second' value={otp.second} onChange={otphandle}   id="second" maxlength="1" /> 
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='third'  value={otp.third} onChange={otphandle}  id="third" maxlength="1" /> 
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='fourth' value={otp.fourth} onChange={otphandle}   id="fourth" maxlength="1" />
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='fifth'  id="fifth" value={otp.fifth} onChange={otphandle} maxlength="1" /> 
   <input class="m-2 border h-10 w-10 text-center form-control rounded" type="text" name='sixth'  value={otp.sixth} onChange={otphandle}  id="sixth" maxlength="1" />
             </div>
             
             <div class="flex justify-center text-center mt-5">
                 <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a>
             </div>
             <div className="flex items-center justify-end mt-4">
            
              <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
       </div>
       </div>
        }
      </div>
      </div>
    </div>
    </>
  );
}

export default App;