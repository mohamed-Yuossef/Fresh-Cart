import { useState } from "react";
import Style from "./CategorySlider.module.css";
import { useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Loading from "../Loading/Loading";

function CategorySlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    arrows: false,
    slidesToShow: 6,
    autoplay: false,
    autoplaySpeed: 1000,
    nextArrow: true,
    prevArrow: true,
    // slickNext:true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data); //!

    setCategories(data?.data);
  }

  useEffect(() => {
    console.log("Mounting CategorySlider");
    getCategories();
  }, []);

  if (categories.length === 0) {
    return <Loading />;
  }
  return (
    <Slider {...settings}>
      {categories.map((c) => (
        <div key={c._id} className=" p-2">
          <img className="h-[200px] w-full object-cover" src={c.image} alt="" />
          <h3 className="text-sm text-green-600 mt-3">{c.name}</h3>
        </div>
      ))}
    </Slider>
  );
}

export default CategorySlider;
