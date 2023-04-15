import "./post.css";
import DynamicFeedSharpIcon from "@mui/icons-material/DynamicFeedSharp";
// import GradeIcon from "@mui/icons-material/Grade";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src="/assets/images/kanashi-BLW_KQ0Rkn0-unsplash.jpg"
              alt="img"
            />
            <span className="postUsername">Unfazed</span>
            <span className="postDate"> Insert post date</span>
          </div>

          <div className="postTopRight">
            <DynamicFeedSharpIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Quality travel time..</span>
          <hr className="postHr"></hr>
          <img
            className="postImg"
            src="assets/images/marcos-paulo-prado-qoifwcnIpjM-unsplash.jpg"
            alt="img"
          />
        </div>
        <div className="postBottom"></div>
        <div className="postBottomLeft">
          {/* <GradeIcon /> */}
          <img className="likeIcon" src="/assets/images/heart.png" alt="like" />
          <span className="postLikeCounter"> 100 likes</span>
        </div>
        <div className="postBottomRight">
          <span className="postComentText">2 comments</span>
        </div>
      </div>
    </div>
  );
}
