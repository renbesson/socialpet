import { Box, Button, FormControl } from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

export default function FileUploader() {
  const [image, setImage] = useState(null);

  const addImage = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <Box>
      <Box>
        <img src={image ? URL.createObjectURL(image) : ""} />
      </Box>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          component="label"
          endIcon={<CloudUploadIcon />}
        >
          Upload Image
          <input hidden accept="image/*" type="file" onChange={addImage} />
        </Button>
      </FormControl>
    </Box>
  );
}
