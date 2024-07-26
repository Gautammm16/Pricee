import {Routes,Route,useNavigate,useLocation} from "react-router-dom"
import './App.css';
import Home from "./pages/home"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Nav from "./component/nav"
import Cart from "./component/cart"
import Products from "./pages/products"
import SearchProduct from "./pages/searchProduct"
import Menu from "./component/menu"
import Team from "./component/team" 
import Contact from "./component/contact"
import Error from "./component/error"
import Leftslide from "./component/leftslide"
import SignleProduct from "./pages/singleproduct"
import OurSignleProduct from "./pages/ourSignleProduct"
import Profile from "./pages/profile"
import Item from "./component/item"
import Ff from "./component/ff"
import Fgpass from "./component/fgpass"
import Billing from "./component/billing"
import Adminlogin from "./component/adminlogin"
import Footer from "./component/footer"
import Timeline from "./pages/orderTimeline"
import { useState } from "react";
import Checkout from "./pages/checkout"
import Privacy from "./pages/privacy"

function App() {
  window.path = "http://localhost:4040/api"
  
  const [isopen,setisopen] = useState(false)
  return (
   <>
   <Routes>
   <Route  exact path="/" element={<Home/>} /> 
    {/* <Route exact path="/category/:cat" element={<Nav/>} /> */}
    
  
    <Route path="/contact" element={<Contact/>} />
    <Route path="/checkout" element={<Checkout isopen={isopen} setisopen = {setisopen} />} />
    <Route path="/profile" element={<Profile isopen={isopen} setisopen = {setisopen} />} />
    <Route path="/singleproduct/:id" element={<SignleProduct  isopen={isopen} setisopen = {setisopen} />} />
    <Route path="/oursingleproduct/:id" element={<OurSignleProduct/>} />
    <Route path="/error" element={<Error/>} />
    {/* <Route path="/item" element={<Item/>} /> */}
    {/* <Route path="/Ff" element={<Ff/>} /> */}
    <Route path="/auth/fgpass" element={<Fgpass/>} />
    <Route path="/adminlogin" element={<Adminlogin/>} />
    <Route path="/billing" element={<Billing/>} />
   <Route  exact path="/auth/signin" element={<Signin/>} />
    <Route exact path="/auth/signup" element={<Signup/>} />
    {/* <Route exact path="/timeline" element={<Timeline/>} /> */}
    <Route exact path="/:cat?/:subcat" element={<Products isopen={isopen} setisopen = {setisopen} />} />
    {/* <Route exact path="/privacy" element={<Privacy isopen={isopen} setisopen = {setisopen} />} /> */}
    <Route exact path="/searchproduct/:q" element={<SearchProduct isopen={isopen} setisopen = {setisopen} />} />
   </Routes>
   {
    useLocation().pathname.includes("/auth") ?
    "" :
     <Footer/>
    }
    <Cart isopen={isopen} setisopen = {setisopen} />
  
   </>
  );

  }
export default App;
