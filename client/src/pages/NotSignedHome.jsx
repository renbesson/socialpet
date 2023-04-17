import * as React from "react";
import ProductCategories from "../components/modules/ProductCatergories";
import ProductHero from "../components/modules/ProductHero";
// import ProductValues from "../components/modules/ProductValues";
import ProductSmokingHero from "../components/modules/ProductSmokingHero";

function Home() {
  return (
    <React.Fragment>
      <ProductHero />
      {/* <ProductValues /> */}
      <ProductSmokingHero />
      <ProductCategories />
    </React.Fragment>
  );
}

export default Home;
