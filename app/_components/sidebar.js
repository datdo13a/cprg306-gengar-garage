export default function SideBar({ children }) {
  return (
    <div className="drawer lg:drawer-open pt-1">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100 min-h-full w-80 pt-8 p-4 gap-4 text-xl font-light text-gray-500">
          {/* Sidebar content here */}
          <li>
            <a>Collection</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Search</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
