import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function Category() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay:true,
    slidesToShow: 5,
    slidesToScroll: 2
  };
  
async function getCategory(){
return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

let{data,isLoading}=useQuery('category',getCategory)
console.log(data?.data.data)
  return (
    <div>  
    
     <Slider {...settings}>
    {data?.data.data.map((cat)=>{
    return <Link to={`/products/category/${cat._id}`}><h3>{cat.name}</h3>
    
    <img src={cat.image} className='w-100'  height={200}/>
    
    </Link>
  
    })}
     </Slider>  
    
    </div>
  )
}
