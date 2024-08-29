import axios from "axios";
import { useEffect, useState } from "react";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>home component</title>
            </Helmet>
        </div>
      <MainSlider/>
      <CategorySlider />
      <RecentProducts />
    </>
  );
}

export default Home;
