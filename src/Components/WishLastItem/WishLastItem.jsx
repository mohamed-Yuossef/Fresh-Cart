import { useContext, useState } from "react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";

import { FaSpinner, FaTrash } from "react-icons/fa";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { FaCartPlus } from "react-icons/fa6";

function WishLastItem({ price, deleteItemFromWish, image, title, id }) {
  if (WishLastItem == null) {
    console.log(WishLastItem);
  }
  const { addToCart, setCartItem } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  async function addCart(id) {
    setIsLoading(true);
    const response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      setIsLoading(false);
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
  useEffect(() => {}, []);
  return (
    <>
      <tr className="p-3 flex flex-wrap justify-between items-center hover:shadow-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4 ">
          <img
            src={image}
            className="mr-6 md:hover:scale-125 duration-75 w-full md:w-32 max-w-full max-h-full rounded-lg"
            alt={title}
          />
        </td>
        <td className="me-auto text-sm font-normal w-full md:max-w-64 text-ellipsis overflow-hidden break-words text-gray-900 dark:text-white">
          <p> {title}</p>
          <button
            onClick={() => {
              deleteItemFromWish(id);
            }}
            className="block mt-8 border py-2 px-3 text-center rounded-md hover:bg-green-300 font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
          >
            <FaTrash className="hover:scale-125 duration-200 inline-block mx-2" />
            Remove
          </button>
        </td>
        <td className=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {price} EGP
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => addCart(id)}
            className=" bg-green-600 text-white px-10 py-3 rounded-lg "
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <div className="w- md:w-28 text-[14px] flex items-center"> <FaCartPlus className="hover:scale-125 duration-200 mx-1 text-2xl"/> Add To Cart</div>
              
            )}
          </button>
        </td>
      </tr>
    </>
  );
}

export default WishLastItem;
