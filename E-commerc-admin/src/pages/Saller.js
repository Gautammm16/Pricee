import React, { useState, useEffect } from 'react'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {FcCancel} from "react-icons/fc"
import {MdOutlineDone} from "react-icons/md"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button , Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Input,
  Label,
  Pagination,} from '@windmill/react-ui'
import {AiFillEye} from "react-icons/ai"
import { EditIcon, TrashIcon } from '../icons'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import response from '../utils/demo/tableData'
// make a copy of the data, for the second table
const response2 = response.concat([])

function Seller() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  function openModal() {
    setIsModalOpen(true)
    setIsEditModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)
  const [pageTable3, setPageTable3] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])
  const [dataTable2, setDataTable2] = useState([])

  const [reportedSeller,setReportedSeller] = useState(null)
  const [seller,setSeller] = useState(null)
  const [pendingSeller,setPendingSeller] = useState(null)
  const resultsPerPage = 10
  const sellers =  [...Array(50)].map((e,i)=>{
          return({
            avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/woodydotmx/128.jpg',
     name: 'Shayna Schumm',
    job: 'Future Directives Engineer',
    amount: 313.73,
    status: 'warning',
    date: 'Wed Jul 03 2019 10:01:06 GMT-0300 (Brasilia Standard Time)',
          })
    })
    const getReportedSeller = async() =>{
      const fetchSeller = await fetch(`${window.path}/getreportedseller`,{
        method:'get'
      })
      const resp = await fetchSeller.json()
      if(resp.status == 1){

        setReportedSeller(resp.result.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
      }
    }
    const getPendingSeller = async() =>{
      const fetchSeller = await fetch(`${window.path}/getpendingseller`,{
        method:'get'
      })
      const resp = await fetchSeller.json()
      console.log(resp)
      if(resp.status == 1){
        setPendingSeller(resp.result.slice((pageTable2 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
      }
    }
    const getSeller = async () =>{
        const fetchSellers = await fetch(`${window.path}/getseller`,{
          method:'get'
        })
        const resp = await fetchSellers.json()
        console.log(resp)
        if(resp.status == 1){
          setSeller(resp.result.slice((pageTable3 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
        }
    }
    useEffect(()=>{
      getPendingSeller()
    },[pageTable2])
    useEffect(()=>{
      getSeller()
    },[pageTable3])
    useEffect(()=>{
      getReportedSeller()
    },[pageTable1])
   var  pagedseller = sellers.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage)

  // pagination setup
  
  const totalResults = sellers.length

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
 
  const rejectSeller = async(id)=>{
    const formdata = new FormData()
    formdata.append('seller_id',id)
    const fetchSeller = await fetch(`${window.path}/rejectseller`,{
      method:"post",
      headers:{
        auth:localStorage.getItem("adminAuth")
      },
      body:formdata
    })
    const resp = await fetchSeller.json()
    if(resp.status == 1){
      getPendingSeller()
      getReportedSeller()
      getSeller()
      setAllSellerDeleteModalOpen(false)
      setPendingSellerDeleteModalOpen(false)
      setReportedSelleDeleterModalOpen(false)
      toast.success("Seller Blocked Succeesfull",{
        autoClose:800,
        position:"top-center"
      })
      
    }
  }

 const [pendingSellerModalOpen,setPendingSellerModalOpen] = useState(false)
 const [pendingSellerDeleteModalOpen,setPendingSellerDeleteModalOpen] = useState(false)
 const [allSellerModalOpen,setAllSellerModalOpen] = useState(false)
 const [allSellerDeleteModalOpen,setAllSellerDeleteModalOpen] = useState(false)
 const [reportedSellerModalOpen,setReportedSellerModalOpen] = useState(false)
 const [reportedSellerDeleteModalOpen,setReportedSelleDeleterModalOpen] = useState(false)
 const [sellerPosition,setSellerPosition] = useState(0)

 
  return (
    <>
      <PageTitle>Sellers</PageTitle>
      <ToastContainer/>
      <SectionTitle>Pending Sellers</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Seller</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {
            pendingSeller != null && pendingSeller?.map((user, i) => (
              <TableRow key={i}> 
                <TableCell>
                  <div className="flex items-center text-sm">

                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={"warning"}>pending</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit"onClick={()=>{ setSellerPosition(i); setPendingSellerModalOpen(true)}}>
                      <AiFillEye className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit" onClick = {()=>{ setSellerPosition(i); setPendingSellerDeleteModalOpen(true)}}>
                      <FcCancel className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit" onClick = {async()=>{
                        const formdata = new FormData()
                      formdata.append("seller_id",user._id)
                      const fetchseller = await fetch(`${window.path}/acceptpendingseller`,{
                        method:"post",
                        body:formdata,
                        headers:{
                          auth:localStorage.getItem("adminAuth")
                        }
                      })
                      const resp = await fetchseller.json()
                      if(resp.status == 1){
                        toast.success("Seller Accepted Successfully!",{
                          autoClose:800,
                          progress:false
                        })
                        getPendingSeller()
                        getSeller()
                      } else{
                        toast.error("Internal Server Error occured Please Try Again!",{
                          autoClose:800,
                          progress:false
                        })
                      }
                    }}>
                      <MdOutlineDone className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
             totalResults={pendingSeller != null ? pendingSeller.length : 1}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Sellers</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Seller</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            { seller != null && seller?.map((user, i) => (
              <TableRow key={i}>
                 <TableCell>
                  <div className="flex items-center text-sm">

                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge type={"success"}>Active</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                  <Button layout="link" size="icon" aria-label="Edit"onClick={()=>{setSellerPosition(i); setAllSellerModalOpen(true)}}>
                      <AiFillEye className="w-5 h-5" aria-hidden="true" />
                    </Button>  
                  <Button layout="link" size="icon" aria-label="Edit" onClick = {()=>{setSellerPosition(i); setAllSellerDeleteModalOpen(true)}}>
                      <FcCancel className="w-5 h-5" aria-hidden="true" /> 
                    </Button>
                    
                    
                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={seller != null ? seller.length : 1}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Reported Sellers</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {reportedSeller != null && reportedSeller.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={"danger"}>{"reported"}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit"onClick={()=>{ setSellerPosition(i); setReportedSellerModalOpen(true)}}>
                      <AiFillEye className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit" onClick = {()=>{ setSellerPosition(i); setReportedSelleDeleterModalOpen(true)}}>
                      <FcCancel className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={reportedSeller !=null ? reportedSeller.length : 1}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable3}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>


      {/* modal for view pending seller */
      pendingSeller != null &&
      <Modal isOpen={pendingSellerModalOpen} onClose={()=>{setPendingSellerModalOpen(false)}}>
        <ModalHeader>
          View Seller
        </ModalHeader>
        <ModalBody>
          {
            pendingSeller != null &&
            <>
            
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Seller name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={pendingSeller[sellerPosition].name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Bussiness name</Label>
                <div className="mt-1">
                  <Input id="lastName" name="lastName" placeholder="Green" 
                  value={pendingSeller[sellerPosition].bussiness_name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={pendingSeller[sellerPosition].email}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">GSTN</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={pendingSeller[sellerPosition].documents?.gstn}
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Adhar</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={pendingSeller[sellerPosition].documents?.adhar_no}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">PAN</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={pendingSeller[sellerPosition].documents?.pan_no}
                  />
                </div>
              </div>
            </div>
            </>
          }
        </ModalBody>
      </Modal>
        }
 {/* modal for view reported seller */
    reportedSeller != null &&
      <Modal isOpen={reportedSellerModalOpen} onClose={()=>{setReportedSellerModalOpen(false)}}>
        <ModalHeader>
          View Seller
        </ModalHeader>
        <ModalBody>
          {
            reportedSeller != null &&
            <>
            
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Seller name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={reportedSeller[sellerPosition].name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Bussiness name</Label>
                <div className="mt-1">
                  <Input id="lastName" name="lastName" placeholder="Green" 
                  value={reportedSeller[sellerPosition].bussiness_name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={reportedSeller[sellerPosition].email}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">GSTN</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={reportedSeller[sellerPosition].documents.gstn}
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Adhar</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={reportedSeller[sellerPosition].documents.adhar_no}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">PAN</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={reportedSeller[sellerPosition].documents.pan_no}
                  />
                </div>
              </div>
            </div>
            </>
          }
        </ModalBody>
      </Modal>
}
      {
        seller != null &&
      <Modal isOpen={allSellerModalOpen} onClose={()=>{setAllSellerModalOpen(false)}}>
        <ModalHeader>
          View Seller
        </ModalHeader>
        <ModalBody>
          {
            seller != null &&
            <>
            
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Seller name</Label>
                <div className="mt-1">
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                    value={seller[sellerPosition]?.name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Bussiness name</Label>
                <div className="mt-1">
                  <Input id="lastName" name="lastName" placeholder="Green" 
                  value={seller[sellerPosition]?.bussiness_name}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                    value={seller[sellerPosition]?.email}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">GSTN</Label>
                <div className="mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder=""
                    value={seller[sellerPosition]?.documents?.gstn}
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Adhar</Label>
                <div className="mt-1">
                  <Input
                    id="department"
                    name="department"
                    placeholder="Development"
                    value={seller[sellerPosition]?.documents?.adhar_no}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">PAN</Label>
                <div className="mt-1">
                  <Input
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                    value={seller[sellerPosition]?.documents?.pan_no}
                  />
                </div>
              </div>
            </div>
            </>
          }
        </ModalBody>
      </Modal>
        }
      {/* delete modal for pending seller  */
      pendingSeller != null &&
      <Modal isOpen={pendingSellerDeleteModalOpen} onClose={()=>{setPendingSellerDeleteModalOpen(false)}}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
         Are you sure want to delete this seller ?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>{setPendingSellerDeleteModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <button style={{borderRadius:"10px"}} onClick={()=>rejectSeller(pendingSeller[sellerPosition]._id)} className='px-4  py-2 bg-red-600 text-white'>Delete</button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={()=>{setPendingSellerDeleteModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block  className="bg-red-200" onClick={()=>rejectSeller(pendingSeller[sellerPosition]._id)} Colors="Adafruit_SSD1306.create_spi(0, 0, 0, 0)" >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      }
       {/* delete modal for  sellers  */
       seller != null &&
      <Modal isOpen={allSellerDeleteModalOpen} onClose={()=>{setAllSellerDeleteModalOpen(false)}}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
         Are you sure want to delete this seller ?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>{setAllSellerDeleteModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <button style={{borderRadius:"10px"}} onClick={()=>rejectSeller(seller[sellerPosition]._id)} className='px-4  py-2 bg-red-600 text-white'>Delete</button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={()=>{setAllSellerDeleteModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden"> 
            <Button block  className="bg-red-200" onClick={()=>rejectSeller(seller[sellerPosition]._id)}  Colors="Adafruit_SSD1306.create_spi(0, 0, 0, 0)" >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      }
         {/* delete modal for  reported Seller  */
         reportedSeller != null &&
         <Modal isOpen={reportedSellerDeleteModalOpen} onClose={()=>{setReportedSelleDeleterModalOpen(false)}}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
         Are you sure want to delete this seller ?
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={()=>{setReportedSelleDeleterModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <button style={{borderRadius:"10px"}} onClick={()=>rejectSeller(reportedSeller[sellerPosition]._id)} className='px-4  py-2 bg-red-600 text-white'>Delete</button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={()=>{setReportedSelleDeleterModalOpen(false)}}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block  className="bg-red-200" onClick={()=>rejectSeller(reportedSeller[sellerPosition]._id)} Colors="Adafruit_SSD1306.create_spi(0, 0, 0, 0)" >
              Delete
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      }
    </>
  )
}

export default Seller
