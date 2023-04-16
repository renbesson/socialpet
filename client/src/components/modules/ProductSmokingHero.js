import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "./Typography";

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 9,
      }}
    >
      <Button
        sx={{
          border: "4px solid currentColor",
          borderRadius: 0,
          height: "auto",
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          Love Post Share
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We believe in loving your pets, capturing your moments with them and
        sharing respectfully with others.
      </Typography>
      <Box
        component="img"
        src="https://www.svgrepo.com/show/221333/theme.svg"
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
  );
}

export default ProductSmokingHero;
