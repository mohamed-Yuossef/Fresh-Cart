import { useState } from "react";
import Style from "./RecentProducts.module.css";
import { useEffect } from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import UseProduct from "../../Hooks/useProduct";

function RecentProducts() {
 
const {isError , error , isLoading , data }= UseProduct();
  //! is loading ==> 
  //! is fetching ==> true 

   
  if (isLoading) {
    return <Loading />;
  }

  if(isError) {
    return <h3>{error}</h3>
  }
  return (
    <div className="grid mt-10 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-1">
      {data?.map((p) => (
        <ProductItem key={p._id} product={p} />
      ))}
    </div>
  );
}

export default RecentProducts;
