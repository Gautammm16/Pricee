import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import { ForbiddenIcon } from '../icons'
import Image  from '../assets/img/logo.png'

function Profile() {
  return (
    <>
    <PageTitle>Profile</PageTitle>
    <div className="flex flex-col items-center">
      <div className='flex w-full  '>
        <div className='w-32'>

            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='w-full rounded-full' />
            <button className='w-full mt-5 bg-purple-600 text-white py-2 rounded-lg'>Edit</button>
        </div>
        <div className='ml-48'>
            <h1 className='text-2xl'>Personal Information</h1>
            <div className='mt-12 ml-20 w-full'>
                        <div className='w-full'>
                            <label className='ml-2'>Name :</label> <br/>
                            <input type='text' className='mt-2 bg-none px-5 py-2 rounded-lg bg-gray-100 w-full ' />
                        </div>
            </div>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default Profile
