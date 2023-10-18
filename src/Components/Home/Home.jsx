import React from "react";
import MainSlider from "../Slider/MainSlider";
import CategorySlider from "../Slider/CategorySlider";
import FeaturedProducts from "../FeatureProducts/FeatureProducts";

import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Fresh Cart</title>
      </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <FeaturedProducts></FeaturedProducts>
    </div>
  );
}
