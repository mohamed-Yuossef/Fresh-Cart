import { useContext, useState } from "react";
import { useEffect } from "react";
import { cartContext } from "../../Context/cartContext";
import { FaCartPlus, FaTrashCan } from "react-icons/fa6";
import CartItem from "../cartItem/cartItem";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import UseProduct from "../../Hooks/useProduct";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItem, setCartItem } = useContext(cartContext);
  const { wishLastItem, setWishLastItem } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const { getUseCart, UpdateItemCart, deleteItem, deleteAllProduct } =
    useContext(cartContext);

  async function getLoggedUseCart() {
    setIsLoading(true);
    const response = await getUseCart();
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      console.log(response.data.data);
      setIsLoading(false);
    }
  }

  async function UpdateQon(id, count) {
    setIsLoading(true);
    const response = await UpdateItemCart(id, count);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Updated");
      setIsLoading(false);
    }
  }
  async function deleteItemFromCart(id) {
    setIsLoading(true);
    const response = await deleteItem(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Deleted");
      setIsLoading(false);
    }
  }

  async function deleteAllItem() {
    setIsLoading(true);
    const response = await deleteAllProduct();
    console.log(response);
    setCartItem(0);
    setCartDetails([]);
    setIsLoading(false);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg p-5 mt-20">
          <div className="flex justify-between items-center">
            <h1 className="font-normal">Cart Shop</h1>
            <h3 className="font-semibold">
              Total number fo Items :{" "}
              <h3 className="text-green-600 inline-flex">{cartItem}</h3>
            </h3>
          </div>
          {cartDetails?.totalCartPrice == 0 ? (
            <div className="mt-16 shadow-lg bg-white h-[50vh] w-full flex flex-col items-center">
              <div className="my-7 bg-slate-100 w-[150px] h-[150px] flex justify-center items-center rounded-full">
                <FaCartPlus className="z-[2] text-[100px] text-center text-green-600" />
              </div>
              <h4 className="text-green-400 text-center mt-10">
                The Cart is empty
              </h4>
              <Link
                to={"/"}
                className="my-6 font-serif bg-green-400 text-white text-lg px-5 py-1 rounded-lg"
              >
                Add Now
              </Link>
            </div>
          ) : (
            <div>
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
                <tbody className="mt-11 flex-wrap justify-center ">
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
              <div className="text-center my-4 flex justify-center">
                <button
                  onClick={deleteAllItem}
                  className="flex items-center mt-5 border p-2 rounded-lg shadow-lg shadow-slate-300 border-spacing-5"
                >
                  <FaTrashCan className= "hover:scale-125 duration-200 text-red-600 me-2 inline-block mx-1" />
                  <h4 className="font-semibold text-lg">
                    {" "}
                    Clear Your Cart
                  </h4>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
