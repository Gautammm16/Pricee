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
    const fetchcat = await fetch(`${window.path}/getservicecategory`,{
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
    
    const formdata = new FormData()
    formdata.append("name",categoryName.toLocaleLowerCase().trim())
    const fetchdata = await fetch(`${window.path}/addservicecategory`,{
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


      <PageTitle>Category </PageTitle>

      {/* <CTA /> */}
      <div className='flex justify-between items-center'>

      <SectionTitle>All Category</SectionTitle>
      <div className='flex justify-around'>
      <Button className="mb-3 mr-16" onClick={()=>setIsModalOpen(true)}>Add Category</Button>
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
                        const fetchdata = await fetch(`${window.path}/deleteservicecategory`,{
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
