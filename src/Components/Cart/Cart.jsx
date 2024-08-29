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
import { Helmet } from "react-helmet";

function Cart() {
  // const {isLoading , isError}=useQuery()
  const { cartItem, setCartItem } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const { getUseCart, UpdateItemCart, deleteItem, deleteAllProduct } =
    useContext(cartContext);

  async function getLoggedUseCart() {
    const response = await getUseCart();
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      console.log(response.data.data);
    }
  }

  async function UpdateQon(id, count) {
    const response = await UpdateItemCart(id, count);
    console.log(response);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Updated");
    }
  }
  async function deleteItemFromCart(id) {
    const response = await deleteItem(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Deleted");
    }
  }

  async function deleteAllItem() {
    const response = await deleteAllProduct();
    console.log(response);
    setCartItem(0)
    setCartDetails([]);
  }

  useEffect(() => {
    getLoggedUseCart();
  }, []);

  return (
    <>
     <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
      <div className="relative overflow-x-auto sm:rounded-lg p-5 mt-20">
        <div className="flex justify-between items-center">
          <h1 className="font-normal">Cart Shop</h1>
          <h3 className="font-semibold">
            Total number fo Items :{" "}
            <h3 className="text-green-600 inline-flex">{cartItem}</h3>
          </h3>
        </div>
        <div className="flex justify-between w-full items-center my-7 ">
          <div className="font-mono text-2xl py-3 px-10 ">
            total price:{" "}
            <span className="text-green-600 w-full">
              {cartDetails?.totalCartPrice}
            </span>
          </div>
          <div>
            <button className="text-clip font-serif text-lg rounded-md bg-green-600 px-7 py-3 text-white">
              <Link to={"/checkout/" + cartDetails?._id}>CheckOut</Link>
            </button>
          </div>
        </div>
        <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products?.map((p) => (
              <CartItem
                deleteItemFromCart={deleteItemFromCart}
                UpdateQon={UpdateQon}
                count={p.count}
                price={p.price}
                product={p.product}
              />
            ))}
          </tbody>
        </table>
        <div 
        className="text-center my-4 flex justify-center">
          <button 
            onClick={deleteAllItem}
            className="flex items-center hover:text-red-700  px-10 py-4 rounded-lg border border-green-500"
          >
            <FaTrashCan className="inline-block mx-1" />
            <h4 className="font-normal">Clear Your Cart</h4>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
