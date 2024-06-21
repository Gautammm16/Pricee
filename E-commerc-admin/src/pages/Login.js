import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'

import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button,Modal } from '@windmill/react-ui'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const history = useHistory()
  const [loginData,setLoginData ] = useState({
    email:"",
    password:""
  })
  const LoginHandle = async() =>{
    const formdata = new FormData()
    formdata.append("email",loginData.email)
    formdata.append("password",loginData.password)
    const fetchLogin = await fetch(`${window.path}/login`,{
      method:"post",
      body:formdata
    })
    const resp = await fetchLogin.json()

    if(resp.status == 1){
      toast.success("Logged In Successfull ",{
        autoClose:1000,
        theme:"light",
        progress:false,
      })
      localStorage.setItem("adminAuth",resp.token)
      setTimeout(()=>{
        history.push("/app/dashboard")
        window.location.reload(false)
      },1200)
     
    }else{
      toast.error("Invalid Username Or Password ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
    }
  }
  
  return (
    <>
    
 

    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <ToastContainer/>
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" onChange={(e)=>{setLoginData({...loginData,email:e.target.value})}} value={loginData.email}  placeholder="Enter admin name here" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" onChange={(e)=>{setLoginData({...loginData,password:e.target.value})}} value={loginData.password} placeholder="***************" />
              </Label>

              <Button className="mt-4" onClick={LoginHandle}>
                Log in
              </Button>

              <hr className="my-8" />

             
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>

            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
