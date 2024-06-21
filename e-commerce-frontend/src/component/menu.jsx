import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flipkart from "../assets/icons/flipkart-logo.png";
import Amazon from "../assets/icons/amazon-logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";


const Menu = () => {
    const navigate = useNavigate()
   const responsive = {
     superLargeDesktop: {
       // the naming can be any, depends on you.
       breakpoint: { max: 4000, min: 3000 },
       items: 4,
     },
     desktop: {
       breakpoint: { max: 3000, min: 1024 },
       items: 4,
     },
     tablet: {
       breakpoint: { max: 1024, min: 464 },
       items: 2,
     },
     mobile: {
       breakpoint: { max: 464, min: 0 },
       items: 1,
     },
   };
 
   
   function classNames(...classes) {
     return classes.filter(Boolean).join(' ')
   }


return (
    <>


<div className="mt-10">
<h1 className="text-xl mb-4 ml-7 font-semibold">
  Flipkart Popular Products
</h1>
<Carousel className="" responsive={responsive} >
  {[...Array(10)].map((e) => (
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
      <a href="" className="flex justify-center ">
        <img
          class="rounded-t-lg w-36"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            iphone 13 pro max
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of
          2021 so far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3  items-center">
        <img className="w-20 h-14" src={Flipkart}  />
        <h1 className="">
          {" "}
          ₹ 3,70,000{" "}
          <span className="text-emerald-600 font-sans">
            {" "}
            (22% off){" "}
          </span>
        </h1>
        <button className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white">
          BUY
        </button>
      </div>
    </div>
  ))}
</Carousel>
</div>
<div className="mt-14">
<h1 className="text-xl mb-4 ml-7  font-semibold">
  Flipkart Popular Products
</h1>
<Carousel className="overflow-scroll" responsive={responsive}>
  {[...Array(10)].map((e) => (
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
      <a href="" className="flex justify-center ">
        <img
          class="rounded-t-lg w-36"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            iphone 13 pro max
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of
          2021 so far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3 py-2 items-center">
        <img className="w-14 h-10" src={Amazon}/>
        <h1 className="">
          {" "}
          ₹ 3,70,000{" "}
          <span className="text-emerald-600 font-sans">
            {" "}
            (22% off){" "}
          </span>
        </h1>
        <button className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white">
          BUY
        </button>
      </div>
    </div>
  ))}
</Carousel>
</div>
<div className="mt-14">
<h1 className="text-xl mb-4 ml-7  font-semibold">
  Flipkart Popular Products
</h1>
<Carousel className="overflow-scroll" responsive={responsive}>
  {[...Array(10)].map((e) => (
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
      <a href="" className="flex justify-center ">
        <img
          class="rounded-t-lg w-36"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            iphone 13 pro max
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of
          2021 so far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3 py-2 items-center">
        <h1 className="">flipkart</h1>
        <h1 className="">
          {" "}
          ₹ 3,70,000{" "}
          <span className="text-emerald-600 font-sans">
            {" "}
            (22% off){" "}
          </span>
        </h1>
        <button className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white">
          BUY
        </button>
      </div>
    </div>
  ))}
</Carousel>
</div>
<div className="mt-14">
<h1 className="text-xl mb-4 ml-7  font-semibold">
  Flipkart Popular Products
</h1>
<Carousel className="overflow-scroll" responsive={responsive}>
  {[...Array(15)].map((e) => (
    <div class="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
      <a href="" className="flex justify-center ">
        <img
          class="rounded-t-lg w-36"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            iphone 13 pro max
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of
          2021 so far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            aria-hidden="true"
            class="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3 py-2 items-center">
        <h1 className="">flipkart</h1>
        <h1 className="">
          {" "}
          ₹ 3,70,000{" "}
          <span className="text-emerald-600 font-sans">
            {" "}
            (22% off){" "}
          </span>
        </h1>
        <button className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white">
          BUY
        </button>
      </div>
    </div>
  ))}
</Carousel>
</div>



</>

);
  }

export default Menu;