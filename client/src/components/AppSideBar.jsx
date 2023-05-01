import { useAuth } from "../utils/authProvider";
import { Link } from "react-router-dom";
import UpdateProfileButton from "./modals/UpdateProfileModal";
import UpdateAvatarButton from "./modals/UpdateAvatarButton";
import SignOutButton from "./modals/SignoutButton";
import { ReactComponent as MenuIcon } from "../icons/MenuIcon.svg";
import { ReactComponent as SignalIcon } from "../icons/SignalIcon.svg";

export default function AppSideBar({ children }) {
  const { user } = useAuth();

  const MenuOptions = () => {
    const signedIn = [
      {
        text: "Update Profile",
        component: <label htmlFor="my-modal">Update Profile</label>,
      },
      { text: "Update Avatar", component: <UpdateAvatarButton /> },
      { text: "Sign Out", component: <SignOutButton /> },
    ];
    const signedOut = [
      { text: "Sign In", link: "/signin" },
      { text: "Sign Up", link: "/signup" },
    ];

    if (user) {
      return signedIn.map(({ text, component }) => <li key={text}>{component}</li>);
    } else {
      return signedOut.map(({ text, link }) => (
        <li key={link}>
          <Link to={link}>{text}</Link>
        </li>
      ));
    }
  };

  return (
    <div className="drawer drawer-mobile">
      {/* <!-- Navbar --> */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-secondary h-16 w-full">
          <div className="flex-1">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="flex-none lg:hidden">
              {user && (
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <MenuIcon />
                </label>
              )}
            </div>
          </div>
          <div className="flex-1">
            <a className="link" href="/">
              <img
                src="/assets/images/logo.png"
                className="object-scale-down max-h-16"
                alt="logo"
              />
            </a>
          </div>
          <div className="flex-1 justify-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 mask mask-squircle">
                  <img
                    src={user?.avatar ? user.avatar : "/assets/images/avatar.png"}
                    alt="avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
              >
                <MenuOptions />
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        {children}
        <UpdateProfileButton />
      </div>
      {user && (
        <div className="drawer-side">
          {/* <!-- Sidebar --> */}
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-56 bg-base-100">
            <div className="navbar bg-secondary absolute left-0 top-0 h-16"></div>
            <li className="mt-16">
              <Link to="/myPosts" className="text-primary">
                <SignalIcon />
                My Posts
              </Link>
            </li>
            <li>
              <Link to="/following" className="text-primary">
                Following
              </Link>
            </li>
            <li>
              <Link to="/followers" className="text-primary">
                Followers
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
