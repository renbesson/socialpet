import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightBar/Rightbar";
import "./homepage.css";

export default function HomePage() {
  return (
    <>
      <div className="homePageContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
