// import React, { useEffect, useState } from 'react'
// import { useLocation,useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import Storenav from "../component/storenav"

// const Products = ({isopen,setisopen}) => {
//     const [product,setProduct] = useState([])
//     const navigate = useNavigate()
//     const location = useLocation()
//     const [page,setPage] = useState(1)


//     const getProduct = async(e) =>{
//         const fetchProduct = await fetch(`${window.path}/getproducts${location.pathname}/${page}`,{
//           method:'get'
//         })
//         const resp = await fetchProduct.json()
        
//         if(resp.status == 1){
//           setProduct(resp.result)
//         }
//       }
//     useEffect(()=>{
//         getProduct(location.pathname)
    
//       },[location,localStorage.getItem("cart")])

//       const addCart = async(url) =>{
        
          
//           if(localStorage.getItem("cart")){
//                   let data = JSON.parse(localStorage.getItem("cart") || "[]")
//                   let old = data.find(o => o.id === url)
//                   if(old){
//                       data.map((e,i)=>{
//                         if(e.id == url){
//                           data[i].q = data[i].q + 1
//                         }
//                       })
//                     // data.push({
//                     //   id:url,
//                     //   q:old.q + 1
//                     // })
//                   }else{
//                     data.push({
//                       id:url,
//                       q:1
//                     })
//                   }
                  
//                   localStorage.setItem("cart",JSON.stringify(data))
//                   toast.success("cart Added",{
//                     autoClose:200,
//                     theme:"light"
//                   })
//                   getProduct(location.pathname)
//           }else{

//             localStorage.setItem("cart",JSON.stringify([{id:url,q:1}]))
//             toast.success("cart Added",{
//               autoClose:200,
//               theme:"light"
//             })
//             getProduct(location.pathname)
//           }
        
//       }
//   return (
//     <>
//     <Storenav isopen={isopen} setisopen = {setisopen}/>
//     <div class="">
//     </div>
//     <ToastContainer/>
//     <section class="py-10 bg-gray-100 z">
//     <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    
    
//       <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
//         {
//           product != null && product.length > 0 ?
//           product.map((e)=>(
            
          
//         <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-400 ">
//           <div >
//             <div class=" flex items-end overflow-hidden rounded-xl" onClick={()=>{
//               if(e.isOur == true){
//                 navigate(`/oursingleproduct/${e.url}`)
//               }else{

//                 navigate(`/singleproduct${e.url.slice(18)}`)}
//               }
//               }>
//               <div className='w-[600px] h-44 flex justify-center'>

//               <img src={e.image} alt="Hotel Photo" className='h-40' />
//               </div>

//             </div>
    
//             <div class="mt-1 p-2">
//               <h2 class="text-slate-700">{e.title}</h2>
//               <p class="mt-1 text-sm text-slate-400">{'amazon'}</p>
    
//               <div class="mt-3 flex items-end justify-between">
//                   <p class="text-lg font-bold text-violet-500">{e.price}</p>
    
//                 <div class="flex items-center space-x-1.5 rounded-lg bg-violet-400 px-4 py-1.5 text-white duration-100 hover:bg-violet-500"
//                 onClick={()=>{
//                   e.isOur == true ?
//                   addCart(e.url) :
//                   window.open(e.buyUrl,'_blank')
//                 }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//                   </svg>
//                     {
//                       e.isOur == true ? 
//                       <button class="text-sm" >
//                           {
//                           localStorage.getItem("cart") &&
//                           JSON.parse(localStorage.getItem("cart") || "[]").find(o => o.id === e.url) ? 
//                           'Cart Again' : 'Add To Cart'
//                           }
//                         </button>
//                       :

//                       <button class="text-sm" >Buy</button>
//                     }
//                 </div>
//               </div>
//             </div>
//           </div>
//         </article>
//         ))
//         : 
//         <p>No Data Found</p>
//       }
//         </div>
//     </section>
//     </>
//   )
// }

// export default Products


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Storenav from '../component/storenav';

const Products = ({ isopen, setisopen }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const getProducts = async () => {
    try {
      const fetchProduct = await fetch(`${window.path}/getproducts${location.pathname}/${page}`, {
        method: 'GET',
      });
      const resp = await fetchProduct.json();
      
      if (resp.status === 1) {
        setProducts(resp.result || []);
      } else {
        toast.error('Failed to fetch products', {
          autoClose: 2000,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('An error occurred while fetching products', {
        autoClose: 2000,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [location, page]);

  const addCart = async (url) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item) => item.id === url);

    if (existingProduct) {
      existingProduct.q += 1;
    } else {
      cart.push({ id: url, q: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Cart updated', {
      autoClose: 2000,
      theme: 'light',
    });
  };

  return (
    <>
      <Storenav isopen={isopen} setisopen={setisopen} />
      <ToastContainer />
      <section className="py-10 bg-gray-100">
        <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((e) => (
              <article
                key={e.url} // Assuming 'e.url' is unique
                className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-400"
              >
                <div>
                  <div
                    className="flex items-end overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => {
                      if (e.isOur) {
                        navigate(`/oursingleproduct/${e.url}`);
                      } else {
                        navigate(`/singleproduct${e.url.slice(18)}`);
                      }
                    }}
                  >
                    <div className="w-[600px] h-44 flex justify-center">
                      <img src={e.image} alt={e.title || 'Product Image'} className="h-40" />
                    </div>
                  </div>

                  <div className="mt-1 p-2">
                    <h2 className="text-slate-700">{e.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">Amazon</p>

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-lg font-bold text-violet-500">{e.price}</p>

                      <div
                        className="flex items-center space-x-1.5 rounded-lg bg-violet-400 px-4 py-1.5 text-white duration-100 hover:bg-violet-500 cursor-pointer"
                        onClick={() => {
                          if (e.isOur) {
                            addCart(e.url);
                          } else {
                            window.open(e.buyUrl, '_blank');
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        {e.isOur ? (
                          <button className="text-sm">
                            {JSON.parse(localStorage.getItem('cart') || '[]').find((o) => o.id === e.url)
                              ? 'Cart Again'
                              : 'Add To Cart'}
                          </button>
                        ) : (
                          <button className="text-sm">Buy</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
