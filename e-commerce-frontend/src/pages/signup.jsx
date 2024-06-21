import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate,Link} from 'react-router-dom'
import * as animationData from '../assets/animation/success.json'
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import Logo from "../logo.png"
const Signup = () =>{
    const navigate = useNavigate()
    const [showsuccess,setshowsuccess] = useState(false)
    const [data,setdata] = useState({
        fullname :"",
        email:"",
        phone:"",
        password:"",
        cpassword:"",
    })
    // const [address, setAddress] = useState('');
   

    const [errMsg, setErrMsg] = useState('');
const handlchange = (e) =>{
    setdata({...data,[e.target.name]:e.target.value})
}
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
        if(data.fullname.length == 0 || /\d/.test(data.fullname)){
            toast.error("please fill full name Properly",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        }
        if(validateEmail(data.email)){
        
        }
        else{
            toast.error("please fill Email Properly",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        }
        
        if(data.phone.length == 0 || /^\d+$/.test(data.phone) == false){
            toast.error("Please Fill Phone Properly",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        }
        if(data.password.length <8){
            toast.error("Password Length Must be 8 character",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        } 
        if(data.cpassword.length <8){
            toast.error("confirm Password Length Must be 8 character",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return  
        }
        if(data.password != data.cpassword  ){
            toast.error("Password are not matching",{
                autoClose:200,
                progress:false,
                theme:"light",
            })
            return
        }
        const form = new FormData()
        form.append("email",data.email)
        form.append("password",data.password)
        form.append("full_name",data.fullname)
        form.append("phone",data.phone)
        const registeruser = await fetch(`${window.path}/register`,{
        method:"post",
        body:form
      })
      const resp = await registeruser.json()
      if(resp.status == 1){
        setshowsuccess(true)
        setTimeout(() => {
            
            localStorage.setItem('auth',resp.token)
            navigate("/")
        }, 1000);

      
    }
    else if (resp.status == -1){
        toast.error("Email Already Exist",{
            autoClose:200,
            progress:false,
            theme:"light",
        })
    } else{
        toast.error("Please Try Again",{
            autoClose:200,
            progress:false,
            theme:"light",
        })
    }

    }
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async(codeResponse) => {
        const fetchdata = await fetch(` https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,{
          method:"get"
        })
          const  data = await fetchdata.json()
            const form = new FormData()
            form.append("full_name",data.name)
            form.append("email",data.email)
            const registeruser = await fetch(`${window.path}/loginwithgoogle`,{
            method:"post",
            body:form
          })
          const resp = await registeruser.json()
          
            if(resp.status == 1){
                localStorage.setItem('auth',resp.token)
                navigate("/")
            }else{
                toast.error("Error Occured Please Try Again!",{
                    autoClose:200,
                    progress:false,
                    theme:"light",
                    transition:"flip"
                })
            }

        },
        
      });

    return(
       <>
       {
              showsuccess == true ?      
              <div className=" z-index-100 w-screen h-screen flex justify-center items-center  bg-white	absolute top-0">
                
                <Lottie options={{
                    loop: true,
                    autoplay: true, 
                    animationData: animationData,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}
                height={200}
                width={200}
                
                
                />
                </div>
           :"" }

        <div class="lg:flex justify-center">
            <ToastContainer/>
            <div class="lg:w-1/2 xl:max-w-screen-sm">
                <div class=" bg-indigo-100 lg:bg-white flex justify-center lg:justify-center     lg:px-12">
                    <div class="cursor-pointer flex items-start">
                        
                           
                            
                        <img class=" text-indigo-800 tracking-wide ml-2 font-semibold w-40 h-28 object-cover" src={Logo} />
                    </div>
                </div>
                <div class="mt-2 px-8 sm:px-24 md:px-48 lg:px-12 lg:mt-2 xl:px-24 xl:max-w-2xl">
                    <h2 class="text-center text-3xl text-indigo-900 font-display font-semibold lg:text-center xl:text-3xl
                    xl:text-bold">Signup</h2>
                    <div class="mt-7">
                     
                            <div>
                                <div class="text-sm mt-2     font-bold text-gray-700 tracking-wide">Full name</div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="fullname" value={data.fullname} onChange={handlchange}  type="text" placeholder="Enter Full name here"/>
                            </div>
                           
                           
                            <div>
                                <div class="text-sm mt-2 font-bold text-gray-700 tracking-wide">Email</div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="email" value={data.email} onChange={handlchange} type="text" placeholder="Enter Email here"/>
                            </div>
                            <div>
                            <div class="text-sm mt-2 font-bold text-gray-700 tracking-wide">Mobile No</div>
                            <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="phone" value={data.phone} onChange={handlchange} type="text" placeholder="Enter your mobile no here"/>
                        </div>
                            <div>
                                <div class="text-sm mt-2 font-bold text-gray-700 tracking-wide">Password</div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="password" value={data.password} onChange={handlchange} type="password" placeholder="Enter password here"/>
                            </div>
                            <div>
                                <div class="text-sm mt-2 font-bold text-gray-700 tracking-wide">Confirm Password</div>
                                <input class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" name="cpassword" value={data.cpassword} onChange={handlchange} type="password" placeholder="Confirm Password"/>
                            </div>

                            
                            <div class="mt-7">
                                <button onClick={handleSubmit} class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                                    Sign up
                                </button>
                            </div>
                            <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-4 space gap-y-0">
                        <button
                          onClick={loginWithGoogle} 
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-violet-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Signup with Google</p>
                        </button>


                        <div class="mt-3 text-sm font-display font-semibold text-gray-700 text-center">
                           Already have an account ? <Link class="cursor-pointer text-indigo-600 hover:text-indigo-800 " to="/auth/signin">Signin</Link>
                        </div>

                        </div>
        </div>
        </div>
        </div>       
           
        </div>
        
      </>
      
 
 
    )}
export default Signup;
