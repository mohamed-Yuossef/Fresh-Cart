import { useContext, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaSpinner, FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { FaCartArrowDown } from "react-icons/fa6";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  arrows: false,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

function ProductDetails() {
  const [favoriteProduct, setFavoriteProduct] = useState({});
  //  const [isLoading, setIsLoading] = useState(false)
  const { addToCart, setCartItem, addToWishList } = useContext(cartContext);
  async function addList(id) {
    const response = await addToWishList(id);
    console.log(response);
    if (response.data.status == "success") {
      setFavoriteProduct({
        ...favoriteProduct,
        [id]: !favoriteProduct[id],
      });
      setCartItem(response.data.numOfCartItems);
      toast.success("It has been successfully added.", {
        duration: 3000,
        icon: <FaHeart className="text-red-600" />,
        position: "top-right",
        style: {
          background: "green",
          padding: "10px 28px",
          color: "white",
        },
      });
    }
  }
  async function addItem(id) {
    const response = await addToCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      toast.success("It has been successfully added.", {
        duration: 3000,
        icon: <FaCartArrowDown />,
        position: "top-right",
        style: {
          background: "green",
          padding: "10px 28px",
          color: "white",
        },
      });
    }
  }
  const { id } = useParams();
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id),
    select: (data) => data.data.data,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-36 p-5">
          <div className="md:grid gap-4 sm:grid-cols-12 ">
            <div className="col-span-full md:col-span-6 lg:col-span-4 ">
              <Slider {...settings}>
                {productDetails?.images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    className="w-[32px] md:w-full object-contain "
                    alt=""
                  />
                ))}
              </Slider>

              {/* <img src={productDetails?.imageCover} className="w-full" alt="" /> */}
            </div>
            <div className="sm:col-span-full md:col-span-6 lg:col-span-8 self-center  py-5 ">
              <h2>{productDetails?.title}</h2>
              <p className="my-3 font-light">{productDetails?.description}</p>
              <h3 className="mb-2">{productDetails?.category.name}</h3>

              <div className="flex mb-3 justify-between">
                <p>{productDetails?.price} EGY</p>
                <p>
                  {productDetails?.ratingsAverage}{" "}
                  <FaStar className="text-yellow-400 inline-block" />{" "}
                </p>
              </div>
              <div className="w-9/12 mx-auto flex justify-between items-center">
                <button
                  onClick={() => addItem(productDetails?.id)}
                  className="w-4/5 bg-green-600 py-1 text-white rounded-md"
                >
                  {isLoading ? <Loading /> : "Add To Cart"}
                </button>
                <button
                  onClick={() => addList(productDetails?.id)}
                  className=" text-green-600 text-4xl rounded-sm"
                >
                  <FaHeart
                    className={`fa-regular fa-heart text-3xl ${
                      favoriteProduct[productDetails?._id]
                        ? "fas text-red-600"
                        : "far text-green-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
