import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Storenav from "../component/storenav"

const SearchProducts = ({isopen,setisopen}) => {
    const [product,setProduct] = useState(null)
    const navigate = useNavigate()
    const param = useParams()
    const location = useLocation()
    const [page,setPage] = useState(1)
    var pages = []

    const getProduct = async() =>{
        const fetchProduct = await fetch(`${window.path}/searchproduct/${param.q}/${page}`,{
          method:'get'
        })
        const resp = await fetchProduct.json()
        // console.log(resp)
        
        if(resp.status == 1){
          setProduct(resp.result)
          // [...Array(Math.floor(resp.result.total/12))].map((e,i)=>{
          //     console.log(i)
          //   pages.push(i+1)
            // })
           
        }
      }
      var currentpages = []
      // if(product != null){
      //   for(var i=0;i<=Math.floor(product.total/12);i++){
      //     pages.push(i+1)
      //   }
      // }
      // if(parseInt(searchParams.get("page"))>=10 ){
      //   let s = (Math.ceil(parseFloat(searchParams.get("page")/10)) - 1 )* 10
      //   currentpages = [...pages.splice(s,7)]
      // }else{
  
      //    currentpages = [...nopages.splice(0,10)]
      // }
    useEffect(()=>{
        getProduct(location.pathname)
    
      },[location,page])

      const addCart = async(url) =>{
        
          
          if(localStorage.getItem("cart")){
                  const data = JSON.parse(localStorage.getItem("cart") || "[]")
                  const old = data.find(o => o.id === url)
                  if(old){
                      data.map((e,i)=>{
                        if(e.id == url){
                          data[i].q = data[i].q + 1
                        }
                      })
                    // data.push({
                    //   id:url,
                    //   q:old.q + 1
                    // })
                  }else{
                    data.push({
                      id:url,
                      q:1
                    })
                  }
                  
                  localStorage.setItem("cart",JSON.stringify(data))
                  toast.success("cart Added",{
                    autoClose:200,
                    theme:"light"
                  })
                  getProduct(location.pathname)
          }else{

            localStorage.setItem("cart",JSON.stringify([{id:url,q:1}]))
            toast.success("cart Added",{
              autoClose:200,
              theme:"light"
            })
            getProduct(location.pathname)
          }
        
      }
  return (
    <>
    <Storenav isopen={isopen} setisopen = {setisopen}/>
    <div class="">
    </div>
    <ToastContainer/>
    <section class="py-10 bg-gray-100 z">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    
    
        <>
      <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {
          product != null && product.data.length > 0 ?
          product?.data?.map((e)=>(
        <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-400 ">
          <div >
            <div class=" flex items-end overflow-hidden rounded-xl" onClick={()=>{
              if(e.isOur == true){
                navigate(`/oursingleproduct/${e.url}`)
              }else{

                navigate(`/singleproduct${e.url.slice(18)}`)}
              }
              }>
              <div className='w-[600px] h-44 flex justify-center'>

              <img src={e.image} alt="Hotel Photo" className='h-40' />
              </div>

            </div>
    
            <div class="mt-1 p-2">
              <h2 class="text-slate-700 cursor-pointer hover:underline " onClick={()=>{

                 window.open(e.url,'_blank')
              }}>{e.title}</h2>
              <p class="mt-1 text-sm text-slate-400">{e.source_name}</p>
    
              <div class="mt-3 flex items-end justify-between">
                  <p class="text-lg font-bold text-violet-500">{e.source_price}</p>
    
                <div class="flex items-center space-x-1.5 rounded-lg bg-violet-400 px-4 py-1.5 text-white duration-100 hover:bg-violet-500"
                onClick={()=>{
                  e.isOur == true ?
                  addCart(e.url) :
                  window.open(e.url,'_blank')
                }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                    {
                      e.isOur == true ? 
                      <button class="text-sm" >
                          {
                          localStorage.getItem("cart") &&
                          JSON.parse(localStorage.getItem("cart") || "[]").find(o => o.id === e.url) ? 
                          'Cart Again' : 'Add To Cart'
                          }
                        </button>
                      :

                      <button class="text-sm" >Buy</button>
                    }
                </div>
              </div>
            </div>
          </div>
        </article>

      
      ))
      : 
          <p>No Data Found </p>
      }
        </div>
        <div className='flex justify-center w-full'>
        <ul class="list-style-none flex">
      <li>
        <a
          class="pointer-events-none relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
          >Previous</a
        >
      </li>
      
      { 
      pages?.map((e,i)=>(
        <>
        <li>
        <a
          class="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          href="#!"
          >{i}</a
        >
      </li>
        </>
      ))
      }
      <li>
        <a
          class="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          href="#!"
          >Next</a
        >
      </li>
    </ul>
        </div>
      </>
    </section>
    </>
  )
}

export default SearchProducts