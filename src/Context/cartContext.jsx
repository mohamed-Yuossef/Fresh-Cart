import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const headers = {
    token,
  };
  console.log(token);

  function getUseCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })

      .then((data) => data)
      .catch((err) => err);
  }
  function getWishList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: headers,
      })

      .then((data) => data)
      .catch((err) => err);
  }
  function addToCart(pId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: pId,
        },
        {
          headers: headers,
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  function addToWishList(pId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: pId,
        },
        {
          headers: headers,
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  function UpdateItemCart(id, count) {
    return axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/cart/" + id,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  function deleteItem(id) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart/" + id, {
        headers: headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }
  function deleteWishList(id) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id, {
        headers: headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }
  function deleteAllProduct() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }

  function CheckOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers,
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  const [cartItem, setCartItem] = useState(0);
  // const [wishLastItem, setWishLastItem] = useState(0);

  async function getCart() {
    const response = await getUseCart();
    console.log(response);
    if (response.data.status == "success") {
      setCartItem(response.data.numOfCartItems);
      console.log({ cartItem });
    }
  }
  async function getWish() {
    const response = await getWishList();
    console.log(response);
    // if (response.data.status == "success") {
    //   setWishLastItem(response.data.count);
    //   console.log({ wishLastItem });
    // }
  }
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    getWish();
  }, []);

  return (
    <cartContext.Provider
      value={{
        deleteAllProduct,
        cartItem,
        CheckOutSession,
        setCartItem,
        getUseCart,
        getWishList,
        addToCart,
        addToWishList,
        UpdateItemCart,
        deleteWishList,
        deleteItem,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
