import { useContext, useState } from "react";
import { FaCartPlus, FaSpinner, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";

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
    <div className="cursor-pointer group relative rounded-md overflow-hidden hover:shadow-xl hover:shadow-blue-500/50 p-4 my-10 mx-3 transition duration-500 ease-in-out">
      <span
        disabled={isLoading}
        onClick={() => addWish(product?._id)}
        className="absolute top-3 right-3 z-10"
      >
        <FaHeart
          className={`text-2xl transition-colors duration-300 ${
            favoriteProduct[product?._id]
              ? "text-red-600"
              : "text-green-500 hover:text-red-500"
          }`}
        />
      </span>

      <Link to={`/productDetails/${product?._id}`}>
        <div className="">
          <img
            src={product?.imageCover}
            className="w-full h-64 object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
            alt={product?.title}
          />
          <p className="text-sm font-light text-green-600 my-2">
            {product?.category.name}
          </p>
          <h3 className="truncate text-lg font-semibold">
            {product?.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between mb-10">
            <p className="font-normal">{product?.price} EGP</p>
            <p className="font-normal">
              {product?.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />
            </p>
          </div>
        </div>
      </Link>

      {/* 🛒 زرار Add to Cart يظهر عند الـ hover */}
      <div className="absolute bottom-0 left-0 w-full p-4  transform md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <button
          onClick={() => addItem(product?._id)}
          className="w-full flex justify-center gap-1 items-center text-sm py-1 bg-green-600 text-white  rounded-lg shadow-md hover:bg-green-700 transition"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaCartPlus className="text-sm" /> Add To Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
