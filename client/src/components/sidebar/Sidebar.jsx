import "./sidebar.css";
import { RssFeed, Group, WorkOutline, PersonSearch } from "@mui/icons-material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <h4>Utlilities</h4>
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
          <li className="sidebarListItem">
            <PersonSearch className="sidebarIcon" />
            <span className="sidebarListItemText">Search</span>
          </li>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            {/* <li className="sidebarFriend">
              <img
                className="sidebarFriendImg"
                src="/assets/images/andrea-lightfoot-ZePrO18ieX4-unsplash.jpg"
                alt="friendpic"
              />
              <span className="sidebarListItemText">Rob Doe</span>
            </li>
            <li className="sidebarFriend">
              <img
                className="sidebarFriendImg"
                src="/assets/images/jamie-street-Zqy-x7K5Qcg-unsplash.jpg"
                alt="friendpic"
              />
              <span className="sidebarListItemText">Dog Smarts</span>
            </li>
            <li className="sidebarFriend">
              <img
                className="sidebarFriendImg"
                src="/assets/images/kanashi-BLW_KQ0Rkn0-unsplash.jpg"
                alt="friendpic"
              />
              <span className="sidebarListItemText">Unfazed Cat</span>
            </li> */}
          </ul>
        </ul>
      </div>
    </div>
  );
}
