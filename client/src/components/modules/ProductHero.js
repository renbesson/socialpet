import * as React from "react";
import Button from "./Button";
import Typography from "./Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import { Link as RouterLink } from "react-router-dom";

const backgroundImage =
  "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "##bfe5f2", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      {/* <Typography color="inherit" align="center" variant="h2" marked="center">
        Love Post and Share
      </Typography> */}
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Welcome to Social Pet, the best Petworking website (in New Brunswick at
        least)
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={RouterLink}
        to="/signup"
        sx={{ minWidth: 200 }}
      >
        Sign up
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
