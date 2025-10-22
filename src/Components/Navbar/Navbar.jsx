import { useContext, useRef, useState, useEffect } from "react";
import logo from "../../assets/imgs/logo.svg";
import {
  FaFacebook,
  FaHeart,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/cartContext";
import { FaCartPlus } from "react-icons/fa6";

function Navbar() {
  const { cartItem, wishListNum } = useContext(cartContext);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  // يغلق المينيو بعد ما أضغط على أي لينك
  function handleNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="text-white fixed w-full items-center z-10 top-0 start-0 bg-gray-200/70 dark:bg-gray-600 border-gray-200">
      <div className="max-w-screen-xl flex gap-5 flex-wrap justify-between items-center mx-auto px-3 py-5 mt-1">
        <a className="flex text-3xl items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="logo" />
        </a>

        {/* زر المينيو للموبايل */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-xl xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              // ❌ أيقونة الإغلاق
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // ☰ أيقونة الفتح
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* قائمة الروابط */}
        <div
          id="navbar-default"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full xl:flex xl:items-center xl:justify-between xl:gap-6  xl:w-auto transition-all duration-300`}
        >
          <ul className="font-medium flex flex-col xl:flex-row justify-between items-center rtl:space-x-reverse  xl:p-0 mt-4 border border-gray-100 rounded-xl xl:mt-0 xl:border-0 dark:border-gray-700 bg-gray-200/90 dark:bg-gray-800 xl:bg-transparent">
            {token && (
              <>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="/"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="products"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="categories"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="brands"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="cart"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="wishlist"
                    className="block py-2 px-3 text-gray-900 xl:hover:text-green-700 dark:text-white"
                  >
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="font-medium flex flex-col justify-center items-center xl:flex-row xl:space-x-8 p-4 xl:p-0 mt-4 border border-gray-100 rounded-xl xl:mt-0 xl:border-0 dark:border-gray-700 bg-gray-200/90 dark:bg-gray-800 xl:bg-transparent">
            {token && (
              <>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="cart"
                    className="relative flex items-center py-2"
                  >
                    <FaCartPlus className="text-2xl text-green-500" />
                    <span className="absolute -right-2 -top-1 text-sm bg-green-600 text-white rounded-full px-2">
                      {cartItem}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleNavClick}
                    to="wishlist"
                    className="relative flex items-center py-2 "
                  >
                    <FaHeart className="text-2xl text-green-500" />
                    <span className="absolute -right-2 -top-1 text-sm bg-green-600 text-white rounded-full px-2">
                      {wishListNum}
                    </span>
                  </NavLink>
                </li>

                <li className="flex gap-4">
                  {" "}
                  <Link
                    to="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    {" "}
                    <FaFacebook />{" "}
                  </Link>{" "}
                  <Link
                    to="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    {" "}
                    <FaTwitter />{" "}
                  </Link>{" "}
                  <Link
                    to="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    {" "}
                    <FaYoutube />{" "}
                  </Link>{" "}
                  <Link
                    to="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    {" "}
                    <FaTiktok />{" "}
                  </Link>{" "}
                </li>
              </>
            )}
            <li onClick={logOut}>
              <span className="cursor-pointer py-2 px-3 text-gray-900 dark:text-white">
                SignOut
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
