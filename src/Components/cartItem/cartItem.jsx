import { useState } from "react";
import { useEffect } from "react";
import Cart from "../Cart/Cart";
import { FaRemoveFormat, FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { FaSpinner } from "react-icons/fa6";

function CartItem({ deleteItemFromCart, UpdateQon, count, price, product }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <tr className=" hover:shadow-green-600 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img
            src={product?.imageCover}
            className="hover:scale-125 duration-200 rounded-xl w-16 md:w-32 max-w-full max-h-full border-2 "
            alt={product?.title}
          />
        </td>
        <td className="text-sm font-normal max-w-64 px-6 py-4 font-sans text-green-900 dark:text-white">
          {product?.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => UpdateQon(product?.id, count - 1)}
              className=" inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-7 w-7 text-gray-500 bg-white border border-green-300 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200 dark:bg-gray-800 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <span>{count}</span>
            </div>
            <button
              onClick={() => UpdateQon(product?.id, count + 1)}
              className="inline-flex items-center justify-center h-7 w-7 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-green-300 rounded-full focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200 dark:bg-gray-800 dark:text-gray-400 dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700"
              type="button"
            >
              <span className="sr-only">Quantity button</span>
              <svg
                className="w-3 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-green-900 dark:text-white">
          {price} EGP
        </td>
        <td className="px-6 py-4">
          <button
            disabled={isLoading}
            onClick={() => deleteItemFromCart(product?.id)}
            className=" block mt-2 border py-2 px-3 text-center rounded-md border-green-200 hover:shadow-lg font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
          >
            <FaTrash className="hover:scale-125 duration-200 inline-block mx-2" />
            {isLoading ? <FaSpinner /> : "Remove"}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CartItem;
