/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC} from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
const SignInPage: FC = function () {
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
const hanldelogin = async() =>{
  if(email.length == 0 ){
    toast.error("please fill Email Properly",{
      autoClose:200,
      progress:false,
      theme:"light",
  })
  return
  } 
  if(password.length == 0 ){
    toast.error("please fill Email Properly",{
      autoClose:200,
      progress:false,
      theme:"light",
  })
  return
  }
  const formdata = new FormData()
  formdata.append("email",email)
  formdata.append("password",password)
  const fetchdata = await fetch(`${window.path}/login`,{
    method:'post',
    body:formdata
  })
  const resp = await fetchdata.json()
  console.log(resp)
  if(resp.status == 1){
    navigate("/sales/list")
      localStorage.setItem("sellerAuth",resp.token)
  } 
  else if (resp.status == -1){
    toast.error("Invalid Password or username!",{
      autoClose:200,
      progress:false,
      theme:"light",
  })
  }
  else if (resp.status == -2){
    toast.error("We Are Sorry You Are Not Verified yet!",{
      autoClose:200,
      progress:false,
      theme:"light",
      position:"top-center"
  })
  }
  else{
    toast.error("Internal Server Error!",{
      autoClose:200,
      progress:false,
      theme:"light",
  })
  }
}

  
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:w-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
      <ToastContainer/>
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Pricee
        </span>
      </div>
      <Card
        horizontal
        imgSrc="/images/authentication/login.jpg"
        imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&<img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to Pricee
        </h1>
      
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="mb-6 flex items-center justify-end">
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto" onClick={hanldelogin}>
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <Link to="/authentication/sign-up" className="text-primary-600 dark:text-primary-300">
              Create account
            </Link>
          </p>
        
      </Card>
    </div>
  );
};

export default SignInPage;
