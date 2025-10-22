import { useContext, useState } from "react";
import { useEffect } from "react";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import WishLastItem from "../WishLastItem/WishLastItem";
import { Helmet } from "react-helmet";
import { FaCartPlus } from "react-icons/fa";

function WishLast() {
  const [isLoading, setIsLoading] = useState(false);
  // const { wishLastItem, setWishLastItem } = useContext(cartContext);
  const [wishDetails, setWishDetails] = useState(null);
  const { getWishList, deleteWishList } = useContext(cartContext);

  async function getLoggedWish() {
    setIsLoading(true);
    const response = await getWishList();
    if (response.data.status == "success") {
      setWishDetails(response.data.data);
      console.log(response.data.data);
      setIsLoading(false);
    }
  }

  async function deleteItemFromWish(id) {
    setIsLoading(true);
    const response = await deleteWishList(id);
    if (response.data.status == "success") {
      setWishDetails(response.data.data);
      getLoggedWish()
      toast.success("Deleted");
      setIsLoading(false);
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg p-5 mt-24">
          <div className="text-center shadow-md rounded-md p-6">
            <h1 className=" font-bold"> Wish list</h1>
          </div>
          <div className="flex justify-between w-full items-center my-7 ">
            <div></div>
          </div>
          <table className=" shadow-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              {wishDetails == "" ? (
                <tr>
                <td colSpan="5">
                  <div className="h-[50vh] w-full flex flex-col items-center justify-center">
                    <div className="bg-slate-100 w-[150px] h-[150px] flex justify-center items-center rounded-full">
                      <FaCartPlus className="text-[100px] text-center text-green-600" />
                    </div>
                    <h4 className="text-green-400 text-center mt-10 font-sans">
                      The wish list is empty
                    </h4>
                    <Link
                      to={"/"}
                      className="mt-6 bg-green-400 text-white text-lg px-5 py-1 rounded-lg font-serif"
                    >
                      Add Now
                    </Link>
                  </div>
                </td>
              </tr>
              ) : (
                wishDetails?.map((p) => (
                  <WishLastItem
                  key={p._id}
                    deleteItemFromWish={deleteItemFromWish}
                    price={p.price}
                    image={p.imageCover}
                    title={p.title}
                    id={p._id}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default WishLast;
