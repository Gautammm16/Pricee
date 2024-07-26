import React, { useEffect, useState } from "react";
import { BsDistributeVertical, BsSearch } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Flipkart from "../assets/icons/flipkart-logo.png";
import Amazon from "../assets/icons/amazon-logo.png";
import defaultProfile from "../assets/images/default_profile.png";
import amway from "../assets/images/amway.png";
import patanjali from "../assets/images/patanjali.png";
import dabur from "../assets/images/dabur.png";
import herbal from "../assets/images/herbal.png";
import himalaya from "../assets/images/himalaya.png";
import { GiClothes } from "react-icons/gi";
import { GiSonicShoes } from "react-icons/gi";
import { FcElectronics } from "react-icons/fc";
import { CgGames } from "react-icons/cg";
import { MdPets } from "react-icons/md";
import { TfiRulerPencil } from "react-icons/tfi";
import { FaTools } from "react-icons/fa";
import { CiBoxes } from "react-icons/ci";
import { MdOutlineChair } from "react-icons/md";
import { MdSportsCricket } from "react-icons/md";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import * as animationData from "../assets/animation/loading.json";
import Products from "./products.jsx";

const Home = () => {
  const navigate = useNavigate();
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [product, setProduct] = useState([]);

  const getproduct = async () => {
    const fetchproduct = await fetch(`${window.path}/new-release`, {
      method: "get",
    });
    const resp = await fetchproduct.json();
    if (resp.status == "success") {
      setProduct(resp.data);
    } else {
      setProduct([]);
    }
  };

  const [popularCategory, setPopularCategory] = useState(null);
  const getPopularCat = async () => {
    const fetchCat = await fetch(`${window.path}/getpopularcat`, {
      method: "get",
    });
    const resp = await fetchCat.json();
    if (resp.status == 1) {
      setPopularCategory(resp.result);
    } else {
      console.error("No data found:", resp.message);
    }
  };
  useEffect(() => {
    getproduct();
    getPopularCat();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [searchparam, setsearchparam] = useState("");
  const [showSearchKeys, setShowSearchKeys] = useState(false);

  const [searchSuggestion, setSearchSuggestion] = useState(null);
  const getkeyword = async () => {
    if (searchparam.length > 3) {
      document.getElementById("search").style = "cursor:wait";
      const fetchkeyword = await fetch(
        `${window.path}/searchproductkeywords/${searchparam}`,
        {
          method: "get",
        }
      );
      const resp = await fetchkeyword.json();

      if (resp.status == 1) {
        setSearchSuggestion(resp.result);
        document.getElementById("search").style = "cursor:pointer";
      } else {
        setSearchSuggestion(null);
        document.getElementById("search").style = "cursor:pointer";
      }
    } else {
      setSearchSuggestion(null);
    }
  };
  useEffect(() => {
    getkeyword();
  }, [searchparam]);
  const [popularSearches, setPopularSearches] = useState("");
  const getPopularSearch = async () => {
    const fetchproduct = await fetch(`${window.path}/popularsearches`, {
      method: "get",
    });
    const resp = await fetchproduct.json();
    if (resp.status == 1) {
      setPopularSearches(resp.result);
    }
  };
  useEffect(() => {
    getPopularSearch();
  }, []);
  return (
    <>
      {product != null ? (
        <>
          <div className="w-full flex justify-center">
            <div className="container">
              <div className="absolute right-52 top-10   rounded-full ">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={defaultProfile}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-3 focus:outline-none">
                      {localStorage.getItem("auth") ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => {
                                  localStorage.removeItem("auth");
                                  window.location.reload(false);
                                }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </p>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/auth/signin"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign In
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="w-full flex justify-center mt-10">
                <h1 className="text-4xl">Pricee</h1>
              </div>
              <div className="flex justify-center w-full mt-5">
                <div className="w-[30rem]">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="search"
                      onChange={(e) => {
                        setsearchparam(e.target.value);
                      }}
                      onFocus={() => {
                        setShowSearchKeys(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowSearchKeys(false);
                        }, 200);
                      }}
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search any product here..."
                      required
                    />
                    <button
                      onClick={() => {
                        navigate(`/searchproduct/${searchparam}`);
                      }}
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <BsSearch />
                    </button>
                  </div>
                  {showSearchKeys == true &&
                  searchparam.length >= 3 &&
                  searchSuggestion != null ? (
                    <div className="block w-full px-1 border-b border-l border-r shadow-lg ">
                      <ul className=" py-1 text-sm text-gray-900  border-gray-300  bg-white  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        {searchSuggestion.map((e) => (
                          <li>
                            <Link
                              to={`/searchproduct/${e}`}
                              className="cursor-pointer hover:underline pl-10 py-1"
                            >
                              {e}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="px-5 flex justify-center mt-2">
                    <h1 className="text-center text-red-500">
                      <span className="text-black">popular : </span>

                      {popularSearches.length > 0 &&
                        popularSearches.map((e) => (
                          <span
                            className="cursor-pointer hover:underline"
                            onClick={() => {
                              navigate(`/searchproduct/${e.name}`);
                            }}
                          >
                            {`${e.name},`}
                          </span>
                        ))}
                    </h1>
                  </div>
                </div>
              </div>

              {/* Flipkart Today's Deal */}

              <div className="mt-14">
                <h1 className="text-xl mb-4 ml-7 font-semibold">
                  Flipkart Today's Deal
                </h1>
                {product != null ? (
                  <Carousel className="" responsive={responsive}>
                    {product.map((e, index) => (
                      <div
                        key={index}
                        className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-12"
                      >
                        <div className="flex justify-center">
                          <img
                            className="rounded-t-lg"
                            src={e.image}
                            alt={e.title}
                            style={{ height: "200px" }}
                          />
                        </div>
                        <div className="p-5">
                          <a
                            href={e.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {e.name}
                            </h5>
                          </a>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {e.rating}
                          </p>
                        </div>
                        <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3 items-center">
                          <img
                            className="w-20 h-14"
                            src={Flipkart}
                            alt="Flipkart"
                          />
                          <h1>
                            {e.price}
                            <span className="text-emerald-600 font-sans">
                              {e.discount}
                            </span>
                          </h1>
                          <button
                            className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white"
                            onClick={() => {
                              window.open(e.url, "_blank", "noreferrer");
                            }}
                          >
                            BUY
                          </button>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-14">
                <h1 className="text-xl mb-4 ml-7  font-semibold">
                  Flipkart Popular Products
                </h1>

                {product != null ? (
                  <Carousel className="" responsive={responsive}>
                    {product.map((e, index) => (
                      <div
                        key={index}
                        className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-12"
                      >
                        <div className="flex justify-center">
                          <img
                            className="rounded-t-lg"
                            src={e.image}
                            alt={e.title}
                            style={{ height: "200px" }}
                          />
                        </div>
                        <div className="p-5">
                          <a
                            href={e.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {e.name}
                            </h5>
                          </a>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {e.rating}
                          </p>
                        </div>
                        <div className="w-full rounded-b-xl bg-zinc-200 flex justify-between px-3 items-center">
                          <img
                            className="w-20 h-14"
                            src={Flipkart}
                            alt="Flipkart"
                          />
                          <h1>
                            {e.price}
                            <span className="text-emerald-600 font-sans">
                              {e.discount}
                            </span>
                          </h1>
                          <button
                            className="bg-red-600 rounded-xl px-5 py-2 text-sm text-white"
                            onClick={() => {
                              window.open(e.url, "_blank", "noreferrer");
                            }}
                          >
                            BUY
                          </button>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-14">
                {/* 
            <h1 className="text-xl mb-4 ml-7  font-semibold">
              Flipkart Popular Products
            </h1>
             <Carousel className="overflow-scroll" responsive={responsive}>
              {[...Array(10)].map((e) => (
                <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
                  <a href="" className="flex justify-center ">
                    <img
                      className="rounded-t-lg w-36"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        iphone 13 pro max
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
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
            </Carousel> */}
              </div>
              <div className="mt-14">
                {/*
            <h1 className="text-xl mb-4 ml-7  font-semibold">
              Flipkart Popular Products
            </h1>
             <Carousel className="overflow-scroll" responsive={responsive}>
              {[...Array(15)].map((e) => (
                <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700 mr-6 ml-6 ">
                  <a href="" className="flex justify-center ">
                    <img
                      className="rounded-t-lg w-36"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfK9eD_tFCaxfT39MW4mQkeUZdLD7mFRR2pg&usqp=CAU"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        iphone 13 pro max
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
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
            </Carousel> */}
              </div>
            </div>
          </div>

          <div className="bg-white pt-24 -pb-1rem sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h1 className="text-center text-2xl font-semibold leading-8 text-gray-900">
                Popular Categories
              </h1>

              <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 tab:max-w-none tab:grid-cols-3 border rounded-lg p-9">
           

                {popularCategory &&
                  Object.keys(popularCategory).map((category, catIndex) => (
                    <div key={catIndex} className="mb-8">
                      <h2 className="text-2xl font-bold text-center mb-4">
                        {category}
                      </h2>
                      {popularCategory[category].map((e, index) => {
                        const urlPath = new URL(e.url).pathname;
                        return (
                          <div
                            key={index}
                            className="grid cursor-pointer"
                            onClick={() => navigate(urlPath)}
                          >
                            <div className="bg-none text-5xl font-bold text-center p-6 m-4 border rounded-lg flex justify-center">
                              <img
                                src={e.image}
                                className="hover:scale-125"
                                alt={e.title}
                              />
                            </div>
                            <p className="text-center hover:underline">
                              {e.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white py-0 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h1 className="text-center text-2xl font-semibold leading-8 text-gray-900">
                Popular Brands
              </h1>

              <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4  border rounded-lg p-9">
                <img
                  className="col-span-2 cursor-pointer max-h-12 w-full object-contain lg:col-span-1 border p-2 rounded-lg hover:scale-125"
                  src={amway}
                  onClick={() => {
                    navigate("/amway-products-list");
                  }}
                  alt="Transistor"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 cursor-pointer w-full object-contain lg:col-span-1 border p-1 rounded-lg hover:scale-125"
                  src={patanjali}
                  onClick={() => {
                    navigate("/patanjali-products-list");
                  }}
                  alt="Reform"
                  width={158}
                  height={48}
                />
                <img
                  className="col-span-2 max-h-12 w-full cursor-pointer object-contain lg:col-span-1 border  rounded-lg hover:scale-125"
                  src={dabur}
                  onClick={() => {
                    navigate("/dabur-products-list");
                  }}
                  alt="Tuple"
                  width={165}
                  height={90}
                />
                <img
                  className="col-span-2 col-start-2 max-h-12 cursor-pointer w-full object-contain sm:col-start-auto lg:col-span-1 border rounded-lg hover:scale-125"
                  src={himalaya}
                  onClick={() => {
                    navigate("/himalaya-products-list");
                  }}
                  alt="Statamic"
                  width={158}
                  height={48}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center ">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      )}
    </>
  );
};

export default Home;
