import Link from "daisyui/components/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="ml-2 mt-5 mb-5 mr-2">
        <Image
          src="/gengar-garage-icon.png"
          alt="gengarGarage"
          width={50}
          height={50}
        ></Image>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gengar Garage
        </a>
      </div>

      <div className="flex gap-10">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
