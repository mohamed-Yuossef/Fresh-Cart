import { useContext, useState } from "react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";

import { FaRemoveFormat, FaSpinner, FaTrash } from "react-icons/fa";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

function WishLastItem({ deleteItemFromWish, price, image, title, id }) {
  const { addToCart, setCartItem } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  async function addCart(id) {
    const response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      // toast.success('add!' ,{})
      toast.success("It has been successfully added.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "green",
          padding: "10px 28px",
          color: "white",
        },
      });
    }
  }
  useEffect(()=>{
    
  },[])
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img
              src={image}
              className="w-16 md:w-32 max-w-full max-h-full"
              alt={title}
            />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {title}
            <h6
              onClick={() => deleteItemFromWish(id)}
              className="mt-2 font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
            >
              <FaTrash className="inline-block mx-2" />
              Remove
            </h6>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {price} EGP
          </td>
          <td className="px-6 py-4">
            <button
              disabled={isLoading}
              onClick={() => addCart(id)}
              className="bg-green-600 text-white px-10 py-3 rounded-lg"
            >
              {isLoading ? <FaSpinner /> : " Add To Cart"}
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default WishLastItem;
