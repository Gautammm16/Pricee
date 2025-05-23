import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate,Link} from 'react-router-dom'



export default function Example({isopen,setisopen}) {
  
  
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
  useEffect(()=>{
    fetchproduct()
  },[isopen])
  return (
    <Transition.Root show={isopen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setisopen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setisopen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {product != null &&  product.map((product,i) => (
                              <li key={product.product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.images[0]}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.product.name}</a>
                                      </h3>
                                      <p className="ml-4">₹ {parseInt(product.product.discounted_price).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.quantity}</p>

                                    <div className="flex">
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
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                       {
                        product != null &&
                        <>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹ {
                          product.reduce(function(tot, arr) { 
                            // return the sum with previous value
                            return tot + parseInt(arr.product.discounted_price)
                          
                            // set initial value as 0
                          },0).toLocaleString()
                          }</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          onClick={() => setisopen(false)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                          Checkout
                        </Link>
                      </div>
                        </>
                        }
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or <br/>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            
                            onClick={() => setisopen(false)}
                          >
                           <Link class="cursor-pointer text-indigo-600 hover:text-indigo-800 " to="/"> Continue shopping</Link>
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
