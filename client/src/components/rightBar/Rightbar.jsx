import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";

export default function RightBar() {
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { md: 200, lg: 300 },
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography sx={{ mt: 4, mb: 1 }} variant="h6" component="div">
        Icon with text
      </Typography>

      <List dense={dense}>
        <ListItem>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary="Single-line item"
            secondary={secondary ? "Secondary text" : null}
          />
        </ListItem>
      </List>
    </Box>
  );
}
