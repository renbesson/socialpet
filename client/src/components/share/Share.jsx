// import { PermMedia } from "@mui/icons-material";
import "./share.css";
// import FileUpload from "../FileUploader";
import { useState } from "react";
import UploadButtons from "../uploadButton/UploadButton";

export default function Share() {
  const [files, setfiles] = useState([""]);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src="assets/images/andrea-lightfoot-ZePrO18ieX4-unsplash.jpg"
            alt="profile-pic"
          />
          <input placeholder="Post comment here.." className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              {/* <PermMedia className="shareIcon" /> */}
              <UploadButtons />
              <button className="shareButton">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
