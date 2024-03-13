import axios from "axios";
import React, { useContext } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";

export default function Products() {

  let { AddToCart } = useContext(cartContext)
  let { BrandId, categoryId } = useParams()

  async function addTocart(id) {
    let { data } = await AddToCart(id)
    if (data.status == 'success') {
      toast.success(data.message)
    } else {
      toast.error('product not added')
    }
  }



  async function getProduct() {
    if (BrandId && BrandId !== "*") {
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${BrandId}`
      );

    }
    else if (categoryId && categoryId !== "*") {


      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );

    }
    else
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery(
    "products",
    getProduct,
    {
      //  refetchOnMount:false,
      // staleTime:3000
      // refetchInterval:3000
      // cacheTime:3000
      enabled: true,
    }
  );
  console.log(data?.data.data);

  return (
    <>
      {/* <button onClick={()=>{refetch()}} className="btn bg-main text-light w-75 m-auto">Get Products</button> */}
      {/* this with useEffect */}
      {/* {products.length > 0 ? (
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-3">
                <div className="product p-5 text-center">
                  <img src={product.imageCover} className="w-100" />
                  <p className="text-main">{product.category.name}</p>
                  <h6 className="text-muted">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h6>

                  <div className="d-flex justify-content-between py-3">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <button className="btn bg-main text-light w-100">Add+</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      )} */}

      {/* useQuery */}

      {isLoading ? (
        <div className="vh-100  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          {
            (data?.data.data.length == 0)
              ?
              <p className="text-center bg-info text-bg-primary rounded-3 p-4 fw-bolder fs-3">No Products for this { BrandId?"Brand" :"category"}</p>
              :
              data?.data.data.map((product) => {
                return (
                  <div className="col-md-3">
                    <div className="product p-5 text-center">
                      <Link to={`/details/${product._id}`}>
                        <img src={product.imageCover} className="w-100" />
                        <p className="text-main">{product.category.name}</p>
                        <h6 className="text-muted">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>

                        <div className="d-flex justify-content-between py-3">
                          <span>{product.price}EGP</span>
                          <span>
                            <i className="fa-solid fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => { addTocart(product._id) }}
                        className="btn bg-main text-light w-100"
                      >
                        Add+
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
    </>
  );
}

// web and developemt
