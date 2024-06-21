import React, { useState } from 'react'
import {BsThreeDotsVertical} from "react-icons/bs"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Dialog } from '@headlessui/react'

const OderHistory = () => {
  const [isComplaintModalOpen,setIsComplaintModalOpen] = useState(false)
  return (
    <>
        
    <div className='border h-40 mt-8'>
    <Transition appear show={isComplaintModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{setIsComplaintModalOpen(false)}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Complaint About Product
                  </Dialog.Title>
                  <div className="mt-2">
                    {/* <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p> */}
                    <div>
                    <textarea name="" id="desc" cols="47" rows="5" placeholder='type Your Complaint Here ....'></textarea>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{setIsComplaintModalOpen(false)}}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    
        <div class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={'https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph'} alt="" />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-semibold flex justify-between">Livpure Pep Pro 7L RO+UF Water Purifier (White)
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-white-800 text-2xl focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                <BsThreeDotsVertical  />
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
                  
                  <>
                  <Menu.Item>
                  {({ active }) => (
                    <p
                    onClick={()=>{setIsComplaintModalOpen(true)}}
                      className={`${active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700'}`}
                    >
                      Complaint 
                    </p>
                  )}
                </Menu.Item>
                </>
                }
              </Menu.Items>
            </Transition>
          </Menu>
          </span>
          <div className='flex justify-between'>
          <span class=" text-gray-400 ">
            {'kennt'}</span>
            <span>
            
            </span>
          </div>
          <div className='flex justify-between'>
          <p class="text-lg font-bold">₹ {parseInt(12458).toLocaleString()}</p>
          <p class="text-lg font-bold"> {'qty. 4'}</p>
          </div>
          <button className='w-full bg-purple-600 mt-2 py-2 rounded-xl text-white font-bold'>Print Bill</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default OderHistory