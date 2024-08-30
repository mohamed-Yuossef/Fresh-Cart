import { useContext, useState } from "react";
import Style from "./ProductItem.module.css";
import { useEffect } from "react";
import { FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";
import Loading from "../Loading/Loading";

function ProductItem({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteProduct, setFavoriteProduct] = useState({});
  const { addToCart, setCartItem, addToWishList } = useContext(cartContext);
  async function addItem(id) {
    setIsLoading(true);
    const response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      setIsLoading(false);
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
  async function addWish(id) {
    const response = await addToWishList(id);
    console.log(response);
    if (response.data.status == "success") {
      setFavoriteProduct({
        ...favoriteProduct,
        [id]: !favoriteProduct[id],
      });
      toast.success("It has been successfully added.", {
        duration: 3000,
        icon: <FaHeart className="text-red-700" />,
        position: "top-right",
        style: {
          background: "green",
          padding: "10px 28px",
          color: "white",
        },
      });
    }
  }

  return (
    <div className="cursor-pointer product trans position: relative rounded-md overflow-hidden hover:shadow-xl hover:shadow-blue-500/50 p-4 my-10 mx-3 transition duration-500 ease-in-out">
      <Link to={`/productDetails/${product?._id}`}>
        <div className="">
          <img
            src={product?.imageCover}
            className="w-full object-cover"
            alt=""
          />
          <p className="text-sm font-light text-green-600 my-2">
            {product?.category.name}
          </p>
          <h3 className="truncate h4 mb-2">
            {product?.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex  justify-between">
            <p className="font-serif">{product?.price} EGY</p>
            <p className="font-serif">
              {product?.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />{" "}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-3">
        <button
          disabled={isLoading}
          onClick={() => addItem(product?._id)}
          className=" font-serif btn rounded-lg bg-green-600 text-white px-14 py-1"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : " + Add"}
        </button>
        <span onClick={() => addWish(product?._id)}>
          <FaHeart
            className={`fa-regular fa-heart text-3xl ${
              favoriteProduct[product?._id]
                ? "fas text-red-600"
                : "far text-green-500"
            }`}
          />
        </span>
      </div>
    </div>
  );
}

export default ProductItem;
