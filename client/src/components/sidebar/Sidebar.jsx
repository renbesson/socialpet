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
          <ul className="sidebarFriendList"></ul>
        </ul>
      </div>
    </div>
  );
}
