import "./post.css";
import DynamicFeedSharpIcon from "@mui/icons-material/DynamicFeedSharp";
// import GradeIcon from "@mui/icons-material/Grade";
import { Users } from "../dummyData";

export default function Post({ post }) {
  console.log(post);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
              alt="img"
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post.userId)[0].username}
            </span>
            <span className="postDate"> I{post.date}</span>
          </div>

          <div className="postTopRight">
            <DynamicFeedSharpIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <hr className="postHr"></hr>
          <img className="postImg" src={post.photo} alt="img1" />
        </div>
        <div className="postBottom"></div>
        <div className="postBottomLeft">
          {/* <GradeIcon /> */}
          <img className="likeIcon" src="/assets/images/heart.png" alt="like" />
          <span className="postLikeCounter"> {post.like} likes</span>
        </div>
        <div className="postBottomRight">
          <span className="postComentText">{post.comment} comments</span>
        </div>
      </div>
    </div>
  );
}
