
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, ListBulletIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link,useLocation } from 'react-router-dom'
import {  Menu } from '@headlessui/react'
import defaultProfile from "../assets/images/default_profile.png";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({isopen,setisopen}) {
  const [open, setOpen] = useState(false)
  const [category,setCategory] = useState(null)
  const getCat = async() =>{
    const fetchcat = await fetch(`${window.path}/getcategories`,{
      method:'get',
    })
    const resp = await fetchcat.json()
    if(resp.status == 1){

      setCategory(resp.result.sort((a,b)=>{if(a.tag>b.tag){return 1} else if (b.tag>a.tag){return -1}}))
    }
    
  } 
  
  const [product,setproduct] = useState(null)
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
const [value,setValue] = useState()
  window.addEventListener('click', () => setValue(localStorage.getItem("cart")));
  useEffect(()=>{
    getCat()
  },[])
  useEffect(()=>{
    fetchproduct()
  },[value])
  return (
  
  <>
    <div className="bg-white  ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4 overflow-scroll ">
                      {category?.map((category) => (
                        <Tab
                          key={category.tag}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium '
                            )
                          }
                        >
                          {category.tag.toUpperCase()}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {category?.map((category) => (
                      <Tab.Panel key={category.tag} className="space-y-10 px-4 pt-6 pb-6">
          
                        {category.data.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name.toUpperCase()}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.tag}-${section.name}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.subcat.map((item) => (
                                <li key={item?.name} className="flow-root">
                                  <Link to={`/${item?.navigate}`}  className="-m-2 block p-2 text-gray-500">
                                    {item?.name?.toUpperCase()}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

           

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                <div className="flow-root">
                    <Link to="" className="-m-2 block p-2 font-medium text-gray-900">
                      View Cart
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/auth/signin" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/auth/signup" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </Link>
                  </div>
                 
                </div>

          
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
       

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

            

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch  ">
                <div className="flex h-full space-x-8 ">
                  {category?.map((category) => (
                    <Popover key={category.tag} className="flex">
                      {({ open,close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.tag.toUpperCase()}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200 "
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className=""
                          >
                            <Popover.Panel className="absolute   inset-x-0 top-full text-sm text-gray-500 ">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 max-w-screen-2xl   " aria-hidden="true" />

                              <div className="relative z-50   ">
                                <div className="mx-auto max-w-4xl bg-white px-10 border shadow-xl  ">
                                  <div className="grid grid-cols-1 gap-y-2 gap-x-4 py-6">
                                    
                                    <div className="row-start-1 grid grid-cols-7 gap-y-2 gap-x-2 text-sm">
                                      {category?.data.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900 ">
                                            {section.name.toUpperCase()}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6  sm:mt-4 sm:space-y-4"
                                          >
                                            {section.subcat.map((item) => (
                                              <li key={item?.name} className="flex "  >
                                                <Link to={`/${item?.navigate}`}  onClick={close} className="hover:text-gray-800 -mt-2 text-xs">
                                                  {item?.name?.toUpperCase()}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

             
                </div>
              </Popover.Group>
                      
                      <div className="ml-auto flex items-center">
                    {
                        !localStorage.getItem("auth") ?
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>
            :  
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
                {
                  localStorage.getItem("auth") ?
                  <>
                  <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                    onClick={()=>{
                        localStorage.removeItem("auth")
                        window.location.reload(false)
                    }}                      
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                    >
                      Sign out
                    </p>
                  )}
                </Menu.Item>
                </>
                :<Menu.Item>
                {({ active }) => (
                  <Link 
                    to="/signin"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                  >
                    Sign In
                  </Link>
                )}
              </Menu.Item>
                }
              </Menu.Items>
            </Transition>
          </Menu>
              }

              
               

                <div className="ml-4 flow-root lg:ml-6">
                  <p onClick={()=>setisopen(true)} className="group -m-2 flex items-center cursor-pointer p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{product != null ? product.length : 0}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

   
</>    





  )
}
