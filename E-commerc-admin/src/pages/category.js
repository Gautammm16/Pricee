import React, { useState, useEffect } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import Select from "react-select"
import { ToastContainer } from 'react-toastify';
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/tableData'
import { CheckboxGroup } from 'rsuite';
// make a copy of the data, for the second table
const response2 = response.concat([])

function Tables() {
 
 
  const [pageTable1, setPageTable1] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenSubCategoryAdd, setIsOpenSubCategoryAdd] = useState(false)
  function openModal() {
    setIsModalOpen(true)
   
  }

  function closeModal() {
  
  }
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }
  
  const resultsPerPage = 10
  const [category,setcategory] = useState(null)
  const [totalResults,settotalResults] = useState(null)
  const [pagedResults,setpagedResults] = useState(null)
  
  const getCat = async() =>{
    const fetchcat = await fetch(`${window.path}/getcategory`,{
      method:"get"
    })
    const cat = await fetchcat.json()
    if(cat.status ==1 ){

      setcategory(cat.result)
      setpagedResults(cat.result.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
      settotalResults(cat.result.length)
      
    }
  }
  useEffect(()=>{
    getCat()
  },[pageTable1])
  const [subcat,setsubcat] = useState(null)
  const [isopensubcatModal,setIsopensubcatModal] = useState(false)
  const [categoryName,setCategoryName] = useState("")
  const [categoryTag,setCategoryTag] = useState("")
  const [subCategoryName,setSubCategoryName] = useState("")
  const [categorySelectedValue,setCategorySelectedValue] = useState()
  const opensubCatModal = async(e,f) => {
    
    const fetchcat = await fetch(`${window.path}/getsubcategory/${e}`,{
      method:"get"
    })
    const cat = await fetchcat.json()

    if(cat.status ==1 ){

      setsubcat(cat.result)
      setIsopensubcatModal(true)
    }else{
      toast.error("No Sub Category Found ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
    }
  }
  const closesubCatModal = (e,f) => {

  }
  const AddCategory = async()=>{
    if(categoryName.length == 0){
      toast.error("Please Give A Name ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      return
    }
    if(categoryTag.length == 0){
      toast.error("Please Give A Name ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      return
    }
    
    const formdata = new FormData()
    formdata.append("name",categoryName.toLocaleLowerCase().trim())
    formdata.append("tag",categoryTag.toLocaleLowerCase().trim())
    const fetchdata = await fetch(`${window.path}/addcategory`,{
      method:"post",
      body:formdata,
    })
    const resp = await fetchdata.json()
    if(resp.status == 1){
      toast.success(" Category Addedd Successfully!",{
        autoClose:1000,
        progress:false
      })
      setCategoryName("")
      setCategoryTag("")
      setIsModalOpen(false)
      getCat()
    }else{
      toast.error("Internal Server Error",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      
    }
  }
const AddSubCategory = async() =>{
    if(subCategoryName.length == 0){
      toast.error("Please Give A Name ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      return
    }
    if(!categorySelectedValue ){
      toast.error("Please Give A Name ",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      return
    }
    const formdata = new FormData()
    formdata.append("category_id",categorySelectedValue.value)
    formdata.append("name",subCategoryName.toLocaleLowerCase().trim())
    const fetchdata = await fetch(`${window.path}/addsubcategory`,{
      method:"post",
      body:formdata,
    })
    const resp = await fetchdata.json()
    if(resp.status == 1){
      toast.success("Sub Category Addedd Successfully!",{
        autoClose:1000,
        progress:false
      })
      setCategorySelectedValue("")
      setSubCategoryName("")
      setIsOpenSubCategoryAdd(false)
    }else{
      toast.error("Internal Server Error",{
        autoClose:1000,
        theme:"dark",
        progress:false,
      })
      
    }
}
  return (
    <>
    <ToastContainer/>
    <Modal isOpen={isModalOpen} onClose={()=>  setIsModalOpen(false)}>
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody className="flex justify-center">
       <div>

        <div>
              <h1 className='mb-2 mt-5'>Category name  : </h1>
          <input type='text' onChange={(e)=>{setCategoryName(e.target.value)}} value={categoryName} className='bg-transparent focus:outline-none border rounded-md border-gray-300 p-2 '/>
          <h1 className='mb-2 mt-5'>Tag name  : </h1>
          <input type='text' onChange={(e)=>{setCategoryTag(e.target.value)}} value={categoryTag} className='bg-transparent focus:outline-none border rounded-md border-gray-300 p-2 '/>
              </div>
       </div>
        </ModalBody>
        <ModalFooter>
          
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={AddCategory} 
            >Add</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={AddCategory}>
              Add
            </Button>
          </div>
        </ModalFooter>
    </Modal>
    <Modal isOpen={isOpenSubCategoryAdd} onClose={()=>  setIsOpenSubCategoryAdd(false)}>
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody className="flex justify-center  overflow-visible">
         <div>
              <div className='flex flex-col justify-around '>
                <h1 className='mb-2'>Category : </h1>
                {
                    category != null ?
                  <Select options={category?.map((e)=>{return ({label:e.name,value:e._id})})}  value={categorySelectedValue} onChange={(e)=>setCategorySelectedValue(e)} styles={{
                    menuList: styles => ({
                      ...styles,
                      background: 'white',
                      height:"120px"
                    }),
                    option: (styles, { isFocused, isSelected }) => ({
                    ...styles,
                    background: isFocused
                    ? 'hsla(#eef2eb)'
                    : isSelected
                        ? '#c9c7d9'
                        : undefined,
                    zIndex: 1,
                  }),
                  menu: base => ({
                    ...base,
                    zIndex: 100,
                  }),
                }} />
              :""}
              </div>
              <div>
              <h1 className='mb-2 mt-5'>Sub Category name  : </h1>
          <input type='text' onChange={(e)=>setSubCategoryName(e.target.value)} value={subCategoryName} className='bg-transparent focus:outline-none border rounded-md border-gray-300 p-2 '/>
              </div>
         </div>
        </ModalBody>
        <ModalFooter>
          
          <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>  setIsOpenSubCategoryAdd(false)}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={AddSubCategory}>Add</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={()=>  setIsOpenSubCategoryAdd(false)}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={AddSubCategory}>
              Add
            </Button>
          </div>
        </ModalFooter>
    </Modal>

    
      <Modal isOpen={isopensubcatModal} onClose={()=>setIsopensubcatModal(false)}>
        <ModalHeader>Sub Category</ModalHeader>
        <ModalBody className="flex justify-center">
        {
        subcat != null ?
      
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {subcat?.map((user, i) => (
              <TableRow key={i} >
                <TableCell onClick={()=>{}}>
                      <p className="font-semibold">{user.name}</p>
                </TableCell>
               
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <button className="bg-red-700 px-5 py-1 text-white rounded-lg " onClick={async()=>{
                      const formdata = new FormData()
                      formdata.append("sub_category_id",user._id)
                      const fetchdata = await fetch(`${window.path}/deletesubcategory`,{
                        method:"post",
                        body:formdata
                      })
                      const resp = await fetchdata.json()
                        console.log(resp)
                      if(resp.status == 1){
                        toast.success("Deleted Successfully!",{
                          position:"top-center",
                          autoClose:1000,

                        })
                          getCat()
                      }
                  }} >Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={subcat.length}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
        :""}
        </ModalBody>
        
      </Modal>


      <PageTitle>Category </PageTitle>

      {/* <CTA /> */}
      <div className='flex justify-between items-center'>

      <SectionTitle>All Category</SectionTitle>
      <div className='flex justify-around'>

      <Button className="mb-3 mr-16" onClick={()=>setIsModalOpen(true)}>Add Category</Button>
      <Button className="mb-3 " onClick={()=>setIsOpenSubCategoryAdd(true)}>Add Sub Category</Button>
      </div>
      </div>
      {
        pagedResults != null ?
      
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {pagedResults?.map((user, i) => (
              <TableRow key={i} >
                <TableCell className="cursor-pointer" onClick={()=>opensubCatModal(user._id)}>
                      <p className="font-semibold">{user.name}</p>
                </TableCell>
               
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <button className="bg-red-700 px-5 py-1 text-white rounded-lg " onClick={
                    async()=>{
                        const formdata = new FormData()
                        formdata.append("category_id",user._id)
                        const fetchdata = await fetch(`${window.path}/deletecategory`,{
                          method:"post",
                          body:formdata
                        })
                        const resp = await fetchdata.json()
                        console.log(resp)
                        if(resp.status == 1){
                          toast.success("Deleted Successfully!",{
                            position:"top-center",
                            autoClose:1000,
  
                          })
                            getCat()
                        }
                    }
                  } >Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={category != null ? category.length : 1}
            resultsPerPage={10}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
        :""}


    </>
  )
}

export default Tables
