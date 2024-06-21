import React, { useState, useEffect } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {AiFillEye} from "react-icons/ai"
import {ImBlocked} from "react-icons/im"
import {FcCancel} from "react-icons/fc"
import {MdOutlineDone} from "react-icons/md"
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
  ModalBody,
  ModalFooter,
  Input,
  Textarea ,
  Label,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../icons'

import response from '../utils/demo/tableData'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// make a copy of the data, for the second table
const response2 = response.concat([])

function Product() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [pageTable3, setPageTable3] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])
  const resultsPerPage = 10
 
  

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  function onPageChangeTable3(p) {
    setPageTable3(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])
const [pendingProducts,setPendingProducts] = useState(null)
const [reportedProducts,setReportedProducts] = useState(null)
const [allProducts,setAllProducts] = useState(null)
const getPendingProduct = async() =>{
  const fetchproduct = await fetch(`${window.path}/getpendingproduct`,{
    method:'get'
  })
  const resp = await fetchproduct.json()
  if(resp.status == 1){
    setPendingProducts(resp.result.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }else{
    setPendingProducts(null)
  }
}
const getAllProduct = async() =>{
  const fetchproduct = await fetch(`${window.path}/getallproduct`,{
    method:'get'
  })
  const resp = await fetchproduct.json()
  if(resp.status == 1){
    setAllProducts(resp.result.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }
}
const getReportedProduct = async() =>{
  const fetchproduct = await fetch(`${window.path}/getreportedproduct`,{
    method:'get'
  })
  const resp = await fetchproduct.json()
  if(resp.status == 1){
    setReportedProducts(resp.result.slice((pageTable3 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }
}
 
useEffect(()=>{
  getPendingProduct()
  getAllProduct()
  getReportedProduct()
},[])
const [pendingProductsPosition,setPendingProductsPosition] = useState(0)
const [allProductsPosition,setAllProductsPosition] = useState(0)
const [reportedProductsPosition,setReportedProductsPosition] = useState(0)
const [isPendingProductOpen,setIsPendingProductOpen] = useState(false)
const [isAllProductOpen,setAllProductOpen] = useState(false)
const [isReportedProductOpen,setReportedProductOpen] = useState(false)
  return (
    <>
   {
      pendingProducts != null ?
     <Modal onClose={() => setIsPendingProductOpen(false)} isOpen={isPendingProductOpen}>
          <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <ToastContainer/>
            <strong>Product Details</strong>
          </ModalHeader>
          <ModalBody className="">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  overflow-y-scroll scrollbar-hide" style={{height:"600px"}}>
              <div>
                <Label htmlFor="firstName"> name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={ 
                        pendingProducts[pendingProductsPosition].name
                      }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Brand</Label>
                <div className="mt-1">
                  <Input id="brand" name="brand"
                   value={ 
                    pendingProducts[pendingProductsPosition].brand
                   }
                  placeholder="Apple " />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Category</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={ 
                      pendingProducts[pendingProductsPosition].category.name
                     }
                    
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Sub Category</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="subCategory"
                    type="tel"
                    value={ 
                      pendingProducts[pendingProductsPosition].sub_category.name
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Original Price</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      pendingProducts[pendingProductsPosition].price
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Discounted Price</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                      pendingProducts[pendingProductsPosition].discounted_price
                     }
                  />
                </div>
              </div>
              {
                pendingProducts[pendingProductsPosition].specification.map((e)=>(

                  <>
                
              <div>
                <Label htmlFor="department">key</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      e.key
                    }
                    />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Value</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                    e.value
                    }
                    />
                </div>
              </div>
              </>
                    ))
              
              }
              <div className='col-span-2'>
                <Label htmlFor="passwordCurrent">Description</Label>
                <div className="mt-1">
                  <Textarea 
                    id="passwordCurrent"
                    name="passwordCurrent"
                    placeholder="Description"
                    rows="5"
                    value={ 
                      pendingProducts[pendingProductsPosition].description
                     }
                  />
                </div>
              </div>
              <div className="flex space-x-5 col-span-2 ">
                {
                  pendingProducts[pendingProductsPosition].images.map((e)=>(

                    <div>
                  <img
                    alt="Apple iMac 1"
                    src={e}
                    className="h-24"
                    />
                </div>
                    ))
                  }
               
              </div>
            </div>
          </ModalBody>
        </Modal>
     :"" }
       {
      allProducts != null ?
     <Modal onClose={() => setAllProductOpen(false)} isOpen={isAllProductOpen}>
          <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <ToastContainer/>
            <strong>Product Details</strong>
          </ModalHeader>
          <ModalBody className="">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  overflow-y-scroll scrollbar-hide" style={{height:"600px"}}>
              <div>
                <Label htmlFor="firstName"> name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={ 
                      allProducts[allProductsPosition].name
                      }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Brand</Label>
                <div className="mt-1">
                  <Input id="brand" name="brand"
                   value={ 
                    allProducts[allProductsPosition].brand
                   }
                  placeholder="Apple " />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Category</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={ 
                      allProducts[allProductsPosition].category.name
                     }
                    
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Sub Category</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="subCategory"
                    type="tel"
                    value={ 
                      allProducts[allProductsPosition].sub_category.name
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Original Price</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      allProducts[allProductsPosition].price
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Discounted Price</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                      allProducts[allProductsPosition].discounted_price
                     }
                  />
                </div>
              </div>
              {
                allProducts[allProductsPosition].specification.map((e)=>(

                  <>
                
              <div>
                <Label htmlFor="department">key</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      e.key
                    }
                    />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Value</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                    e.value
                    }
                    />
                </div>
              </div>
              </>
                    ))
              
              }
              <div className='col-span-2'>
                <Label htmlFor="passwordCurrent">Description</Label>
                <div className="mt-1">
                  <Textarea 
                    id="passwordCurrent"
                    name="passwordCurrent"
                    placeholder="Description"
                    rows="5"
                    value={ 
                      allProducts[allProductsPosition].description
                     }
                  />
                </div>
              </div>
              <div className="flex space-x-5 col-span-2 ">
                {
                  allProducts[allProductsPosition].images.map((e)=>(

                    <div>
                  <img
                    alt="Apple iMac 1"
                    src={e}
                    className="h-24"
                    />
                </div>
                    ))
                  }
               
              </div>
            </div>
          </ModalBody>
        </Modal>
     :"" }

     {/* // reported proudct view Modal product  */}
     {
      reportedProducts != null ?
     <Modal onClose={() => setReportedProductOpen(false)} isOpen={isReportedProductOpen}>
          <ModalHeader className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <ToastContainer/>
            <strong>Product Details</strong>
          </ModalHeader>
          <ModalBody className="">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  overflow-y-scroll scrollbar-hide" style={{height:"600px"}}>
              <div>
                <Label htmlFor="firstName"> name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={ 
                      reportedProducts[reportedProductsPosition].name
                      }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Brand</Label>
                <div className="mt-1">
                  <Input id="brand" name="brand"
                   value={ 
                    reportedProducts[reportedProductsPosition].brand
                   }
                  placeholder="Apple " />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Category</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={ 
                      reportedProducts[reportedProductsPosition].category.name
                     }
                    
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Sub Category</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="subCategory"
                    type="tel"
                    value={ 
                      reportedProducts[reportedProductsPosition].sub_category.name
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Original Price</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      reportedProducts[reportedProductsPosition].price
                     }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Discounted Price</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                      reportedProducts[reportedProductsPosition].discounted_price
                     }
                  />
                </div>
              </div>
              {
                reportedProducts[reportedProductsPosition].specification.map((e)=>(

                  <>
                
              <div>
                <Label htmlFor="department">key</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={ 
                      e.key
                    }
                    />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Value</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={ 
                    e.value
                    }
                    />
                </div>
              </div>
              </>
                    ))
              
              }
              <div className='col-span-2'>
                <Label htmlFor="passwordCurrent">Description</Label>
                <div className="mt-1">
                  <Textarea 
                    id="passwordCurrent"
                    name="passwordCurrent"
                    placeholder="Description"
                    rows="5"
                    value={ 
                      reportedProducts[reportedProductsPosition].description
                     }
                  />
                </div>
              </div>
              <div className="flex space-x-5 col-span-2 ">
                {
                  reportedProducts[reportedProductsPosition].images.map((e)=>(

                    <div>
                  <img
                    alt="Apple iMac 1"
                    src={e}
                    className="h-24"
                    />
                </div>
                    ))
                  }
               
              </div>
            </div>
          </ModalBody>
        </Modal>
     :"" }
      <PageTitle>Products</PageTitle>

      <SectionTitle>Pending products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
            pendingProducts != null ?
            pendingProducts.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.images[0]} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
             
                <TableCell>
                <span className="text-sm">{user.category.name}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm">{user.sub_category.name}</span>
                </TableCell>
                <TableCell>
                  <Badge type={'warning'}>pending</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <AiFillEye className="w-5 h-5" aria-hidden="true" onClick={()=>{ setPendingProductsPosition(i);  setIsPendingProductOpen(true)}} />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={async()=>{
                      const formdata = new FormData()
                      formdata.append("product_id",user._id)
                      const fetchData = await fetch(`${window.path}/acceptproduct`,{
                        method:"post",
                        body:formdata,
                        headers:{
                          auth:localStorage.getItem("adminAuth")
                        }
                      })
                      const resp = await fetchData.json()
                      if(resp.status == 1){
                        toast.success("Product Accepted Successfully ",{
                          autoClose:1000,
                          theme:"light",
                          progress:false,
                        })
                        getAllProduct()
                        getPendingProduct()
                      }else{
                        toast.error("Please Try Again",{
                          autoClose:1000,
                          theme:"dark",
                          progress:false,
                        })
                      }
                    }} >
                      <MdOutlineDone className="w-4 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <ImBlocked className="w-4 h-5" aria-hidden="true" />
                    </Button>
                      
                  </div>
                </TableCell>
              </TableRow>
            ))
          : <h1>
            No Data Found
          </h1>}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={pendingProducts != null ? pendingProducts.length : 4}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>All Products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
            <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
            allProducts != null ? 
            allProducts.map((user, i) => (
              <TableRow key={i}>
                 <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.images[0]} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                <span className="text-sm">{user.category.name}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm">{user.sub_category.name}</span>
                </TableCell>
                <TableCell>
                  <Badge type={'success'}>success</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                    <AiFillEye className="w-5 h-5" aria-hidden="true" onClick={()=>{setAllProductsPosition(i);setAllProductOpen(true)}} />
                    </Button>
                    {
                    <Button layout="link" size="icon" aria-label="Delete">
                    <ImBlocked className="w-4 h-5" aria-hidden="true" />
                    </Button>
                  }
                  </div>
                </TableCell>
              </TableRow>
            ))
          :  
          <h1 className='flex justify-center w-full'>No Data Found</h1>
          }
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={allProducts != null ? allProducts.length  : 0}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Reported Products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
            <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
            reportedProducts != null ?
            reportedProducts.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.images[0]} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                <span className="text-sm">{user.category.name}</span>
                </TableCell>
                <TableCell>
                <span className="text-sm">{user.sub_category.name}</span>
                </TableCell>
                <TableCell>
                  <Badge type={'warning'}>pending</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                    <AiFillEye className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                    <ImBlocked className="w-4 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          : 
          <h1 className='flex justify-center w-full'>No Data Found</h1>
          }
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={reportedProducts != null ? reportedProducts.length : 0}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable3}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Product
