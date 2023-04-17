import "./post.css";
import DynamicFeedSharpIcon from "@mui/icons-material/DynamicFeedSharp";
// import GradeIcon from "@mui/icons-material/Grade";
import { Users } from "../dummyData";
import { useState } from "react";

export default function Post({ post }) {
  console.log(post);

  const [like, setLike] = useState(post.like);
  const [isliked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  console.log("***" + Users.filter((u) => u._id === post.ownerId));

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={Users.filter((u) => u._id === post.ownerId[0].avatar)}
              alt="img"
            />
            <span className="postUsername">
              {Users.filter((u) => u._id === post.ownerId[0].name)}
            </span>
            <span className="postDate"> Yesterday(To be updated)</span>
          </div>

          <div className="postTopRight">
            <DynamicFeedSharpIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.content}</span>
          <hr className="postHr"></hr>
          <img className="postImg" src={post.mediaUrl} alt="img1" />
        </div>
        <div className="postBottom"></div>
        <div className="postBottomLeft">
          {/* <GradeIcon /> */}
          <img
            className="likeIcon"
            src="/assets/images/heart.png"
            onClick={likeHandler}
            alt="like"
          />
          <span className="postLikeCounter"> {post.likedBy.length} likes</span>
        </div>
        <div className="postBottomRight">
          {/* <span className="postComentText">{post.comment} comments</span> */}
        </div>
      </div>
    </div>
  );
}
