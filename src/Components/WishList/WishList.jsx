import { useContext, useState } from "react";
import { useEffect } from "react";
import { cartContext } from "../../Context/cartContext";
import { FaTrashCan } from "react-icons/fa6";
import CartItem from "../cartItem/cartItem";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import UseProduct from "../../Hooks/useProduct";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import WishLastItem from "../WishLastItem/WishLastItem";
import { Helmet } from "react-helmet";

function WishLast() {
 const [isLoading, setIsLoading] = useState(false)
  const {cartItem, setCartItem } = useContext(cartContext);
  const [wishDetails, setWishDetails] = useState(null);
  const { getWishList,deleteWishList} = useContext(cartContext);

  async function getLoggedWish() {
    const response = await getWishList();
    if (response.data.status == "success") {
      setWishDetails(response.data.data);
      console.log(response.data.data);
    }
  }


  async function deleteItemFromWish(id) {
    
    const response = await deleteWishList(id);
    setIsLoading(true)
    console.log(response);
    if (response.data.status == "success") {
      setWishDetails(response.data.data);
      toast.success("Deleted");
      setIsLoading(false)
    }
  }

  useEffect(() => {
   getLoggedWish();
  }, []);

  return (
    <>
     <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>WishLast</title>
            </Helmet>
        </div>
    {isLoading?<Loading/> :<div className="relative overflow-x-auto sm:rounded-lg p-5 mt-24">
        <div className="shadow-md rounded-md p-6 flex justify-between items-center">
          <h1 className=" font-bold">Wish list</h1>
         
        </div>
        <div className="flex justify-between w-full items-center my-7 ">
          <div>
         
          </div>
        </div>
        <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
         
          <tbody>
            {wishDetails?.map((p) => (
              <WishLastItem
              deleteItemFromWish={deleteItemFromWish}
              price={p.price}
              image={p.imageCover}
              title={p.title}
              id={p._id}
              
              />
             
            ))}
          </tbody>
        </table>
      
      </div>}
    </>
  );
}

export default WishLast;
