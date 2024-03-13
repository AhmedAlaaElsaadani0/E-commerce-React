import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import style from './brands.module.scss'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Brands() {
  // https://ecommerce.routemisr.com/
  // {{BaseUrl}}/api/v1/brands
  const [Brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const getBrands = async () => {
    let response = await (await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)).data
    if (response.results) {
      setBrands(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getBrands()
  }, [])


  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {loading ? (<div className="vh-100  d-flex justify-content-center align-items-center">
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
        <div className="row">
          {Brands?.length > 0 && Brands.map((brand) => {
            return (
              <div className="col-md-3" >
                <Link to={`/products/brand/${brand._id}`} className={style.brand}>
                <div className={style.brand + " p-5 text-center"} >
                  <img src={brand.image} className="w-100" />
                  <h6 className="text-muted">
                    {brand.name}
                  </h6>
                </div>
                </Link>
              </div>
            );
          }
          )
          }
        </div>
      )}
    </>
  )
}
