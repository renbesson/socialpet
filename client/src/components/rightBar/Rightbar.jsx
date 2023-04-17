import "./rightbar.css";
import * as React from "react";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import UpdateProfile from "../profileUpdate/ProfileUpdate";
import { useState } from "react";

export default function Rightbar() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <h4>User Profile</h4>
        <div className="profileRight">
          <div className="profileRightTop">
            <img
              className="profileUserImg"
              src="assets/images/alvan-nee-8g0D8ZfFXyA-unsplash.jpg"
              alt=""
            />
          </div>
        </div>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <span className="sidebarListItemText">
              {" "}
              Username: Best Pet Ever
            </span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Email: bestpet@pets.com</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Followers: ##</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItemText">Following: ##</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
      </div>
      <div className="updateProfileButton">
        <Button
          variant="contained"
          UpdateIcon={<UpdateIcon />}
          onClick={() => {
            // console.log(setOpenPopup);
            setOpenPopup(true);
          }}
        >
          {" "}
          Update Profile
        </Button>
        <UpdateProfile openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </div>
    </div>
  );
}
