const axios = require('axios');
const Product = require("../model/product.js");
const cheerio = require('cheerio');
const fs = require('fs');
const puppeteer = require("puppeteer");

const product_category = require('../model/product_category.js');
const product_sub_category = require('../model/product_sub_category.js');
const service_category = require('../model/service_category.js');

// async function getHTML(productURL) {
//     try {
//         const { data: html } = await axios.get(productURL, {
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
//             }
//         });
//         return html;
//     } catch (error) {
//         console.error('Error fetching HTML:', error.message);
//         return null;
//     }
// }


async function getHTML(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error('Error fetching HTML:', error.message);
        return null;
    }
}

async function getAmazonPrice(html) {
    const $ = cheerio.load(html);
    return $;
}

async function getAmazonModel(html) {
    const $ = cheerio.load(html);
    const span = $('#productTitle');
    return span.html();
}

// exports.getproduct = async (req, res) => {
//     try {
//         const flipkart = await getHTML("https://www.flipkart.com/");
//         var flipkartProducts = [];
//         if (flipkart) {
//             let $ = cheerio.load(flipkart);
//             $('._3YgSsQ').each((_idx, el) => {
//                 const shelf = $(el);
//                 const url = `http://flipkart.com${shelf.find('._3YgSsQ div a ').attr('href')}`;
//                 const image = shelf.find('a ._10pg75 div img').attr('src');
//                 const title = shelf.find('a ._3LU4EM').text();
//                 const offer = shelf.find('a ._2tDhp2').text();
//                 const description = shelf.find('a ._3khuHA').text();
                
//                 flipkartProducts.push({
//                     url,
//                     image,
//                     title,
//                     offer,
//                     description
//                 });
//             });
//         }

//         if (flipkartProducts.length > 0) {
//             console.log(flipkartProducts);
//             res.json({ status: 1, message: "Product Found Successfully", result: flipkartProducts });
//         } else {
//             res.json({ status: 0, message: "No Data Found" });
//         }
//     } catch (error) {
//         console.error('Error in getproduct:', error.message);
//         res.status(500).json({ status: 0, message: "Internal Server Error" });
//     }
// };

exports.getpopularproduct = async (req, res) => {
    try {
        const flipkartHTML = await getHTML("https://pricee.com/");
        const flipkartProducts = [];

        if (flipkartHTML) {
            const $ = cheerio.load(flipkartHTML);

            // $('div._slideX.slazy > div._pdwg').each((index, element) => {
            $('div._pdwg').each((index, element) => {
                const product = {};
                
                product.image = $(element).find('._thmb img').attr('data-original') || $(element).find('._thmb img').attr('src') || 'default-image-url';
                product.name = $(element).find('._pdscn ._hd._lc').text().trim() || 'No Name';
                product.rating = $(element).find('._prate .good').text().trim() || 'No Rating';
                product.price = $(element).find('._prc span').first().text().trim() || 'No Price';
                product.discount = $(element).find('._ofrtxt').text().trim() || 'No Discount';
                product.link = $(element).find('a').attr('href') || '#';

                
                flipkartProducts.push(product);
                console.log(flipkartProducts);
            });
        }

        res.json({
            status: "success",
            data: flipkartProducts
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Server Error",
            error: error.message
        });
    }
};



exports.getIndProduct = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id });
        if (product.length > 0) {
            res.json({ status: 1, message: "Product Found", result: product[0] });
        } else {
            res.json({ status: 0, message: "Product Not Found" });
        }
    } catch (error) {
        console.error('Error in getIndProduct:', error.message);
        res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};



exports.getPopularCat = async (req, res) => {
    try {
        const pricee = await getHTML("https://www.pricee.com/");
        let category = {};

        if (pricee) {
            let $ = cheerio.load(pricee);
            $('._ctlcb').each((_idx, el) => {
                const shelf = $(el);
                const mainTitle = shelf.find("._ctlcn._lc").text().trim();
                const newele = shelf.find("a");
                const singleCategory = [];

                newele.each((_idxx, elmnt) => {
                    const elm = $(elmnt);
                    const url = elm.attr('href');
                    const image = elm.find('.thumb img').attr('src');
                    const title = elm.find('._ctlcn').text().trim();

                    singleCategory.push({
                        url,
                        image,
                        title
                    });
                });

                if (mainTitle) {
                    category[mainTitle] = singleCategory;
                }
            });

            if (Object.keys(category).length > 0) {
                res.json({ status: 1, message: "Data Found", result: category });
            } else {
                res.json({ status: 0, message: "Data Not Found" });
            }
        } else {
            res.json({ status: 0, message: "Data Not Found" });
        }
    } catch (error) {
        console.error('Error in getPopularCat:', error.message);
        res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
};



exports.getCat = async(req,res) =>{
          const cat =   await  product_category.aggregate([
                {
                    $group : {
                        _id: '$tag',
                        category:{$push:'$$ROOT'}
                    }
                }
             ])
             if(cat.length>0){

               const data =  cat.map(async(e)=>{
                  const cateogrywithsubcat =  await e.category.map(async(f)=>{
                    
                       const subCat = await product_sub_category.find({category_id:f._id})
                       const subCatWithNavigate = subCat.map((g)=>{
                        const chars = {
                            ' & ': '-',
                            ' ': '-',
                          };
                            if(f.tag.toLowerCase() == 'appliances'){
                               
                                  
                                 return({name:g.name,navigate:`${f.name.replace(/ & | /g, m => chars[m])}/${g.name.replace(/ & | /g, m => chars[m])}-${f.name.replace(/ & | /g, m => chars[m])}-products-price-in-india`})   
                            } 
                            else if (f.tag == 'electronics'){
                                if(f.tag == 'electronics' && (f.name == 'appliances' || f.name == 'popular') ){
                                    return({name:g.name,navigate:`${g.name.replace(/ & | /g, m => chars[m])}/${g.name.replace(/ & | /g, m => chars[m])}-products-price-in-india`})   
                                }else{
                                    return({name:g.name,navigate:`${f.name.replace(/ & | /g, m => chars[m])}/${g.name.replace(/ & | /g, m => chars[m])}-${f.name.replace(/ & | /g, m => chars[m])}-products-price-in-india`})   
                                }
                            }
                            else if (f.tag == 'grocery & gourmet food'){
                                
                                return({name:g.name,navigate:`${g.name.replace(/ & | /g, m => chars[m])}/${g.name.replace(/ & | /g, m => chars[m])}-products-price-in-india`})   
                                
                            }
                            else if (f.tag == 'personal care'){
                                
                                return({name:g.name,navigate:`${g.name.replace(/ & | /g, m => chars[m])}/${g.name.replace(/ & | /g, m => chars[m])}-products-price-in-india`})   
                                
                            }
                            else if (f.tag == 'popular brands'){
                                
                                return({name:g.name,navigate:`${g.name.replace(/ & | /g, m => chars[m])}-products-list`})   


                                
                            }
                       })
                       return({
                        _id : f._id,
                        name : f.name,
                        tag:f.tag,
                        createdAt:f.createdAt,
                        subcat : subCatWithNavigate
                       })
                   })
                  const data = await  Promise.all(cateogrywithsubcat)
                  return ({
                    tag:e._id,
                    data:data
                  })
                })
                  const resp = await Promise.all(data)
                 if(resp.length > 0){
                    return res.json({status:1,message:"Data Found!",result:resp})
                }else{

                    return res.json({status:0,message:"Internal Server Error!",})
                }
                
            }else{
                    return res.json({status:0,message:"Data Not Found!",})

         }
            
}

exports.getProduct = async(req,res) =>{

const product = await getHTML(`https://pricee.com/${req.params.cat}${req.params.subcat ? `/${req.params.subcat}` : '' }?sort=price&order=asc&is_ajax=2&v=1&size=30&page=${req.params.page}`)
// console.log(req.params.cat);
 const subcategory = req.params.subcat ? req.params.subcat.split("-products")[0]   : req.params.cat.split("-products")[0]
const findingSubCat = await product_sub_category.find({name : subcategory.replace("-"," ")})
var ourProduct = []
if(findingSubCat.length > 0){
    ourProduct = await Product.find({sub_category:findingSubCat[0]._id,is_verified:true,})
}

if(product){
    let $ = cheerio.load(product.response)            
    const productData = []
    $('._lpdw').each((idx,el)=>{
        const shelf = $(el)
        const title = shelf.find(" a ").attr().title
        const url = shelf.find(" a ").attr().href
        const img = shelf.find("  ._flx ._lpimg img ").attr().src
        const price = shelf.find("._lpbuy ._lprc span").first().text()
        const discount = shelf.find("._lpbuy ._lprc ._ofrtxt").text()
        

        if(shelf?.find("._lpbuy ._btn")?.attr()?.href){

            productData.push({
                title,
                url,
                image:img,
                 buyUrl:shelf?.find("._lpbuy ._btn")?.attr().href,
                price,
                discount,
                isOur:false
            })
        }
    })
    // console.log(productData);
    if(ourProduct.length>0){
        const prodcutWithImageURL = ourProduct.map((e)=>{
          const images =   e.images.map((f)=>{
                if(f.length>0){
                  if(fs.existsSync(`uploads/seller/product/${f}`)){
                    const path = process.env.PRODUCT_IMAGE_URL
                    return `${path}/${f}`
                  }else{
                    return ''
                  }      

                }else{
                    return ''
                }
            })
            e.images = images
            return e
        })
        prodcutWithImageURL.map((e)=>{
            
            productData.push({
                title:e.name,
                url:e._id,
                image:e.images[0],
                buyUrl: `${e._id}`,
                price : `₹${e.discounted_price}`,
                discount:e.discount,
                isOur:true
            })
        })
        }
    if(productData.length>0){
        // console.log(productData);
        const sorter = (a, b) => {
            return +a.price - +b.price;
         };
         productData.sort(sorter);
         return res.json({status:1,message:"Product Data Found",result:productData})
        
    }else{
        return res.json({status:0,message:"No Data Found",})

    }
}else{
    return res.json({status:0,message:"No Data Found",}) 
}
}


exports.getSingleProduct = async(req,res) =>{
    const url = req.params.url
    const singleproduct = await getHTML(`https://pricee.com/${req.params.url}`)
    if(singleproduct){
        let $ = cheerio.load(singleproduct) 
        const singleProductData = []
        $('._lhs').each((_id,elem)=>{
                const shelf = $(elem)
                const title = shelf.find("._wgtp div ._hdt h1").text()
                const url = shelf.find(" div ._trtwgt  ._trtprc ").attr().href
                const price = shelf.find("div ._trtwgt   ._trtprc ").text()

                const image = shelf.find("._flx ._pdcnt div div div div img ").attr().src
                const specsdata = []
                 shelf.find("._flx ._pmdl #specs ._grybg table tbody tr ").each((e,x)=>{
                    const elment = $(x) 
                   
                    specsdata.push({
                            [elment.find("td:nth-child(1)").text().toLocaleLowerCase()]:elment.find("td:nth-child(2)").text().toLocaleLowerCase()
                        })
                })


                singleProductData.push({title,image,url,price,detail:specsdata})

        })
        if(singleProductData.length>0){
            return res.json({status:1,message:"Product Found",result:singleProductData[0]})
        }else{
            return res.json({status:0,message:"Product Not Found"})
        }
    }

}

exports.searchProducts = async(req,res)=>{
    const resp = await axios.get(`https://pricee.com/api/v1/search.php?q=${req.params.q}&size=12&lang=en&page=${req.params.page}`)
    if(resp.status == 200){
        res.json({status:1,message:"Data Found",result:resp.data})
    }else{
        
        res.json({status:0,message:"Data Not Found",})
    }

   
}

exports.getOurSingleProduct = async(req,res) =>{
    const product = await Product.find({_id:req.params.url})
    if(product.length>0){
        product[0].images.map((f,i)=>{
            if(f.length>0){
                if(fs.existsSync(`uploads/seller/product/${f}`)){
                  const path = process.env.PRODUCT_IMAGE_URL
                  product[0].images[i]  = `${path}/${f}`
                }else{
                    product[0].images[i] =  ''
                }      

              }else{
                product[0].images[i] = ''
              }
        })
        return res.json({status:1,message:"Product Found",result:product[0]})
    }else{
        return res.json({status:0,message:"Product Not Found"})
    }
}
exports.getPopularSearch = async(req,res)=>{
    const data = await getHTML("https://pricee.com")
    const $ = cheerio.load(data)
    const popular = []
    $("._plnk a").each((id,el)=>{
        const elm = $(el)
        const name = elm.text()
         const url = elm.attr().href
        popular.push({
            name,
            url
        })

    })
    if(popular.length>0){
        // console.log(popular);
        res.json({status:1,message:"List found",result:popular})
    }else{
        res.json({status:0,message:"List Not Found"})

    }
}
exports.getSearchKeyWords = async(req,res) =>{
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto("https://pricee.com");
    await page.type('input[name=q]', `${req.params.key}`, {delay: 20})
    const $ = cheerio.load(await page.content())
    const list = []
    

    $('autosuggest ul li').each((id,el)=>{
        const elm = $(el)
        const key = elm.find("span").text()
        list.push(key.slice(0,key.length-req.params.key.length))
        
    })
    await browser.close();
    if(list.length>0){
        return res.json({status:1,message:"List found",result:list})
    }else{
        return res.json({status:0,message:"List Not Found"})

    }
}

exports.getServiceCategory = async (req,res)=>{
    const cat = await service_category.find()
    if(cat.length>0){

        return res.json({status:1,message:"Category Data Found!",result:cat})
    }else{
        return res.json({status:0,message:"Category Not Found!"})

    }
}

exports.getTours = async(req,res) =>{
    let page = req.params.page
    let cat = req.params.cat
    let limit = 6
    if(req.headers.auth && req.headers.auth != "" ){
        var user = jwt.verify(req.headers.auth,process.env.USER_SECRET);
    }
    page = (page-1)*limit 
    console.log(user)
    const ToursData = await Service.find({category:cat},{},{skip:page,limit:limit})
    const total = await Service.count()
    if(ToursData.length>0){
        var data = ToursData.map(async(e)=>{
            var getBookData = []
            
            if(user){
                getBookData = await Service_booking.find({user_id:user.id,service_id:e._id})
                console.log(getBookData)
            }
                if(e.image && e.image != ""){
                    if(fs.existsSync(`uploads/tours/${e.image}`)){
                        const path = process.env.TOUR_IMAGE_URL
                        var image = `${path}/${e.image}`
                    }else{
                        var image = ""
                    }
                }else {
                    var image = ""
                }                
                const obj = Object.assign({}, e._doc);
                obj.image = image
                getBookData.length>0? obj.isBooked = true : obj.isBooked = false
                return obj
        })
        data = await Promise.all(data)
        if(data.length>0){
            return res.json({status:1,message:"Data Found!", result:data,total})
        }else{    
            return res.json({status:0,message:"No Data Found!"})
        }
    }else {
        return res.json({status:0,message:"No Data Found!"})
        
    }
}

exports.bookTour = async(req,res) =>{
    // const user = await User.find({_id:req.session.user.id})
                if (!req.body.service_id || req.body.service_id == ''){
                    return res.json({status:0,message:"Please Proive Service id"})
                }
            const book = new Service_booking({
                user_id:req.session.user.id,
                service_id:req.body.service_id
            })
            await book.save()
            return res.json({status:1,message:"Booked successfully"})

}