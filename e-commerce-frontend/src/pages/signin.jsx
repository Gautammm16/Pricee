import { useRef,useState,useEffect } from "react";
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google';
import { useNavigate,Link} from 'react-router-dom'
import React from 'react';
import Logo from "../logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () =>{
   const navigate = useNavigate()

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

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

        //   if(location.pathname == "/signin"){
  
        //     navigate("/signup",
        //     {
        //     state : {email:data.email,name:data.name,profile:data.picture}
        //   })
        //   }else{
        //     navigate("/createandadd",
        //     {
        //     state : {email:data.email,name:data.name,profile:data.picture}
        //   })
            
        //   }
  
        },
        
      });
      const [email,setemail] = useState("")
      const [pass,setpass] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(email.length == 0){

            toast.error("Please fill email",{
                autoClose:200,
                progress:false,
            })  
            return
        }
        if(pass.length == 0){

toast.error("Please fill password",{
    autoClose:200,
    progress:false,
})  
return
}
        

            const form = new FormData()
            form.append("email",email)
            form.append("password",pass)
            const registeruser = await fetch(`${window.path}/login`,{
                method:"post",
                body:form
          })
          const resp = await registeruser.json()
          
            if(resp.status == 1){
                localStorage.setItem('auth',resp.token)
                
                navigate("/")
            }else{
                toast.error("Invalid Username or Password",{
                    autoClose:200,
                    progress:false,
                    theme:"light",
                    transition:"flip"
                })
            }

        }

    return(
        <>
        <div class="lg:flex justify-center">
            <ToastContainer/>
            <div class="lg:w-1/2 xl:max-w-screen-sm ">
                <div class="w-full   bg-white lg:bg-white  flex justify-center lg:justify-center lg:px-12">
                    <div class="cursor-pointer flex items-end justify-center">
                        <div>
                            
                        <img class="text-5xl text-indigo-800 tracking-wide  font-semibold w-40 h-24  object-cover" src={Logo} />
                        </div>
                    </div>
                </div>
                <div class="mt-4 px-12 sm:px-24 md:px-48 border-2 py-5 lg:px-12 lg:mt-6 xl:px-24 xl:max-w-2xl">
                    <h2 class="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-center xl:text-5xl
                    xl:text-bold">Sign In</h2>
                    <div class="mt-12">
                        <form>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="xyz@gmail.com"/>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <Link to="/auth/fgpass" className="text-xs font-display font-semibold text-purple-600 hover:text-indigo-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" value={pass} onChange={(e)=>{setpass(e.target.value)}} placeholder="Enter your password"/>
                            </div>
                            <div className="mt-10">
                                <button 
                                onClick={handleSubmit}
                                className="bg-purple-600 text-gray-100 p-3 text-xl w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-700
                                shadow-lg">
                                   Sign in
                                </button>
                            </div>
                        </form>
                        
                        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white">Or</div>
                    </div>


                    <div className="my-6 space-y-2">
                    <button
                        aria-label="Sign in with Google"
                        onClick={loginWithGoogle}
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
                        <p>sign in with Google</p>
                    </button>
                    </div>
                 

                        <div class="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ? <Link class="cursor-pointer text-purple-600 hover:text-indigo-800 " to="/auth/signup">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        {//     <div class="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        //     <div class="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                
        //     </div>
        // </div>
        }
        </div>
      
      
      
      
        </>
    )
}

export default Signin;
