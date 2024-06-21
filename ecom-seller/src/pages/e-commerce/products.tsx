/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import Select from 'react-select'
import { FC, useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from "../users/list";

const EcommerceProductsPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>
     <div className="block items-center sm:flex">
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div> 
          
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
      
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
        />
      </div>
    </form>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
const [productImageURL,setproductImageURL] = useState([])

  const [data,setData] = useState({
    name:"",
    category:"",
    sub_category:"",
    brand : "",
    price :"",
    discounted_price : "",
    description:"",
   


  })
  const handleinputs = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const [category,setcategory] = useState(null)
  const [subcategory,setSubcategory] = useState(category != null && category[0])
  const [countOfField,setCountOfField] = useState(1)
  const [specification,setSpecification] = useState([{key:"",value:''}])
  const getCat = async() =>{
    const fetchcat = await fetch(`${window.path}/getcategory`,{
      method:"get",
      headers:{
        auth:localStorage.getItem("sellerAuth")
      }
    })
    const cat = await fetchcat.json()
    if(cat.status ==1 ){
        const cate = cat.result?.map((e)=>{
          return({label:e.name,value:e._id})
        })
      setcategory(cate)
    }
  }
  const getSubCat = async(e) =>{
    const fetchcat = await fetch(`${window.path}/getsubcategory/${e.value ? e?.value : category.length>0 && category[0]._id }`,{
      method:"get",
      headers:{
        auth:localStorage.getItem("sellerAuth")
      }
    })
    const cat = await fetchcat.json()
    if(cat.status ==1 ){
        const cate = cat.result?.map((e)=>{
          return({label:e.name,value:e._id})
        })
        console.log(cate)
      setSubcategory(cate)
    }else{
      setSubcategory("")
      setData({...data,sub_category:""})
    }
  }
  useEffect(()=>{
    getCat()
  },[])
  
  
  const addProduct = async(e) =>{
    e.preventDefault()
    
    if(data.name.length == 0  ){
      toast.error("please fill product name Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(data.description.length == 0  ){
      toast.error("please fill description Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(data.price.length == 0 && /^\d+$/.test(data.price) ){
      toast.error("please fill price Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(data.discounted_price.length == 0 && /^\d+$/.test(data.discounted_price) ){
      toast.error("please fill discounted price Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(data.brand.length == 0  ){
      toast.error("please fill brand Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(!data.category?.value ){
      toast.error("please fill category Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    if(!data.sub_category?.value  ){
      toast.error("please fill sub Category Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    const specificationCheck = specification.map((e)=>{
      if(e.key.length == 0 || e.value.length == 0){
        return false
      }
      else {
        return true
      }
    })
    if(specificationCheck == false){
      toast.error("please fill Specification Properly",{
        autoClose:200,
        progress:false,
        theme:"light",
    })
    return
    }
    const formdata = new FormData()
    formdata.append("name",data.name)
    formdata.append("description",data.description)
    formdata.append("price",data.price)
    formdata.append("discounted_price",data.discounted_price)
    formdata.append("brand",data.brand)
    formdata.append("category",data.category.value)
    formdata.append("sub_category",data.sub_category.value)
    specification.map((e)=>{
      formdata.append("specification",JSON.stringify(e))
    })
    productImageURL.map((e)=>{
      formdata.append("product",e)
    })

    const fetchdata = await fetch(`${window.path}/addproduct`,{
      headers:{
        auth:localStorage.getItem("sellerAuth")
      },
      method:"post",
      body:formdata
      
    })
    const resp = await fetchdata.json()
    if(resp.status == 1){
      setData({
        name:"",
    category:"",
    sub_category:"",
    brand : "",
    price :"",
    discounted_price : "",
    description:"",
      })
    }
    setproductImageURL([])
    toast.success("Product Added Successfully",{
      position:"top-center",
      autoClose:400,
      progress:false
    })
    window.location.reload(false)
    
  }
  
  return (
    <>

      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <ToastContainer/>
        <FaPlus className="mr-2 text-lg" />
       Add Product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}  className="h-screen" >
        <Modal.Header className="border-b border-gray-200   !p-6 dark:border-gray-700">
          <strong>Add Product</strong>
        </Modal.Header >
        <Modal.Body className="overflow  h-[80%] " >
          <form className="h-[35rem] overflow-y-scroll scrollbar-hide">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="name"
                  onChange={handleinputs}
                  value={data.name}
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                {
                  category != null ?

                  <Select
                  id="category"
                  name="category"
                  onChange = {(e)=>{setData({...data,category:e}); getSubCat(e)}}
                  defaultInputValue={category[0]}
                  value={data.category}
                  options={category}
                  placeholder="Electronics"
                  className="mt-1"
                  />
                :""}
              </div>
              <div>
                <Label htmlFor="category">Sub Category</Label>
                {
                    subcategory != null &&
                  <Select
                  id="category"
                  name="sub_category"
                  onChange = {(e)=>setData({...data,sub_category:e})}
                  value={data.sub_category}
                  options={subcategory}
                  placeholder="Electronics"
                  className="mt-1"
                  />
                }
              </div>
              
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  onChange = {handleinputs}
                  value={data.brand}
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Original Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  onChange = {handleinputs}
                  value={data.price}
                  type="number"
                  placeholder="2300"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="Discountprice">Discounted Price</Label>
                <TextInput
                  id="Discountprice"
                  name="discounted_price"
                  onChange = {handleinputs}
                  value={data.discounted_price}
                  type="number"
                  placeholder="15555"
                  className="mt-1"
                />
              </div>
              <Label htmlFor="" className="col-span-2 -mb-5">Specifications</Label>
              {
                  specification.map((e,i)=>(
                    <>
                <div>
                <Label htmlFor="price"> key</Label>
                <TextInput
                  id="price"
                  name="key"
                  onChange = {(e)=>{
                    let data = [...specification];
                    data[i]['key'] = e.target.value;
                    setSpecification(data)
                  }
                  }
                  value={e?.key}
                  type="text"
                  placeholder="Model"
                  className="mt-1"
                  />
              </div>
              <div>
                <Label htmlFor="Discountprice">Value</Label>
                <span className="grid grid-cols-12">
                <TextInput
                  id="Discountprice"
                  name="discounted_price"
                  onChange = {(e)=>{
                    let data = [...specification];
                    data[i]['value'] = e.target.value;
                    setSpecification(data)
                  }
                  }
                  value={e?.value}
                  type="text"
                  placeholder="Kent RO"
                  className="mt-1 col-span-11"
                  />
                  {
                    
                    <span className="flex justify-center items-center mr-1 cursor-pointer" onClick={()=>{
                    if(specification.length>1){
                      let data = [...specification];
                      data.splice(i, 1)
                      setSpecification(data)
                                       
                    }
                    }}><HiTrash className="text-2xl text-red-500  " /> </span>
                  }
                  </span>
                  </div> 
                </>
                  ))
                }
              <div className="col-span-2 mr-4">
              <Button color="primary" className="float-right mr-5" onClick={()=>{setCountOfField(countOfField+1);setSpecification([...specification,{key:"",value:""}])}}>
            Add More
          </Button>
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="description"
                  onChange = {handleinputs}
                  value={data.description}
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-5 ">
                {
                  productImageURL.map((e)=>(

                    <div>
                  <img
                    alt="Apple iMac 1"
                    src={URL.createObjectURL(e)}
                    className="h-24"
                    />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" onClick={async()=>{
                      setproductImageURL(productImageURL.filter(f=> f != e ))
                      
                    }} />
                  </a>
                </div>
                    ))
                  }
               
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700" onChange={(e)=>{
                    if(productImageURL.length<3){
                      setproductImageURL([...productImageURL,e.target.files[0]])
                    }
                  }}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" multiple />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [data,setData] = useState({
    name:"",
    category:"",
    sub_category:"",
    brand : "",
    price :"",
    discounted_price : "",
    description:"",
    product:[]


  })
  const handleinputs = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{},[])
  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="name"
                  onChange={handleinputs}
                  value={data.name}
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  onChange = {handleinputs}
                  value={data.category}
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  onChange = {handleinputs}
                  value={data.brand}
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  onChange = {handleinputs}
                  value={data.price}
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="description"
                  onChange = {handleinputs}
                  value={data.description}
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="flex space-x-5">
                <div>
                  <img
                    alt="Apple iMac 1"
                    src="/images/products/apple-imac-1.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 2"
                    src="/images/products/apple-imac-2.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
                <div>
                  <img
                    alt="Apple iMac 3"
                    src="/images/products/apple-imac-3.png"
                    className="h-24"
                  />
                  <a href="#" className="cursor-pointer">
                    <span className="sr-only">Delete</span>
                    <HiTrash className="-mt-5 text-2xl text-red-600" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC = function ({id}) {
  const [isOpen, setOpen] = useState(false);
  const deleteProduct = async() =>{
    console.log("hey")
    const formdata = new FormData()
    formdata.append("product_id",id)
    const fetchdata = await fetch(`${window.path}/deleteproduct`,{
      headers:{
        auth:localStorage.getItem("sellerAuth")
      },  
      method:"post",
      body:formdata,
    })
    const reps = await fetchdata.json()
    if(reps.status == 1){
      toast.success("Product Deleted Successfully",{
        position:"top-center",
        autoClose:400,
        progress:false
      })
      window.location.reload(false)
      setOpen(false)
    }
  }
  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <ToastContainer/>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={deleteProduct}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProductsTable: FC = function () {
  const [products,setProducts] = useState(null)
  const getProduct = async() =>{
    const fetchdata = await fetch(`${window.path}/getproducts`,{
      method:"get",
      headers:{
        auth:localStorage.getItem("sellerAuth")
      }
    })
    const resp = await fetchdata.json()
    if(resp.status == 1){
     
        setProducts(resp.result)
    }
  }
  const [page,setpage] = useState(1)

  useEffect(()=>{
    getProduct()
  },[])
  return (
    <>
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
          <Checkbox />
        </Table.HeadCell>
        <Table.HeadCell>Product Name</Table.HeadCell>
        <Table.HeadCell>Brand</Table.HeadCell>
        <Table.HeadCell>Discounted Pirce</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>Sub Category</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">

        {
          products != null &&
          products?.map((e)=>(
        <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
          <Table.Cell className="w-4 p-4">
            <Checkbox />
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            <div className="text-base font-semibold text-gray-900 dark:text-white">
             {e.name}
            </div>
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {e.brand}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
            {e.discounted_price}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
          {e.price}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
          {e.category?.name}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
          {e.sub_category.name}
          </Table.Cell>
          <Table.Cell className="space-x-2 whitespace-nowrap p-4">
            <div className="flex items-center gap-x-3">
              {/* <EditProductModal /> */}
              <DeleteProductModal  id={e._id} />
            </div>
          </Table.Cell>
         
        </Table.Row>
      ))}
      </Table.Body>
    </Table>
    <Pagination page={page} setpage={setpage} total={products != null ? products.length : 10} perpage={10} />
    </>
  );
};

export default EcommerceProductsPage;
