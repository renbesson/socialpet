import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "./Typography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGV0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    title: "Snack time",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    title: "Really",
    width: "20%",
  },
  {
    url: "https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODB8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
    title: "Getting the greens",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1517352551702-336dda93455e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzcwfHxwZXRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
    title: "Alright now",
    width: "38%",
  },
  {
    url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
    title: "Doh!",
    width: "38%",
  },
  {
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60",
    title: "Are we there yet?",
    width: "24%",
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all types of pets
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
