import { useContext, useState } from 'react'
import Style from './Products.module.css'
import { useEffect } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from '../Loading/Loading'
import ProductItem from '../ProductItem/ProductItem'
import { Helmet } from 'react-helmet'

function Products() {
    
    const {
        isFetching , 
        isLoading ,
        isError ,
        error ,
        data
      } = useQuery({
        queryKey: ['products'],
        queryFn: ()=> axios.get('https://ecommerce.routemisr.com/api/v1/products'),
        select : (data) => data?.data.data ,
    
        
      })
    
    
      //! is loading ==> 
      //! is fetching ==> true 
       console.log({
        isLoading ,
        isFetching
       });
       
      if (isLoading) {
        return <Loading />;
      }
    
      if(isError) {
        return <h3>{error}</h3>
      }
      return (
        <>
          <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>products</title>
            </Helmet>
        </div>
        <div className="grid mt-24 gap-4 sm:grid-cols-2 p-5 md:grid-cols-2 xl:grid-cols-4">
          {data.map((p) => (
            <ProductItem key={p._id} product={p} />
          ))}
        </div>
        </>
       
      );
}

export default Products
