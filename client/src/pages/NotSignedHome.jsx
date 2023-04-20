import * as React from "react";
import ProductCategories from "../components/modules/ProductCategories";
import ProductHero from "../components/modules/ProductHero";
// import ProductValues from "../components/modules/ProductValues";
import ProductSmokingHero from "../components/modules/ProductSmokingHero";

export default function NotSignedHome() {
  return (
    <React.Fragment>
      <ProductHero />
      {/* <ProductValues /> */}
      <ProductSmokingHero />
      <ProductCategories />
    </React.Fragment>
  );
}
