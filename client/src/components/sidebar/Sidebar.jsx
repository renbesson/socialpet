import "./sidebar.css";
import { RssFeed, Group, WorkOutline } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText"> Feed</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            <li className="sidebarFriend">
              <img
                className="sidebarFriendImg"
                src="/assets/images/andrea-lightfoot-ZePrO18ieX4-unsplash.jpg"
                alt="friendpic"
              />
              <span className="sidebarListItemText">Rob Doe</span>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
