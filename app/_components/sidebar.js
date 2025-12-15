"use client";
import Link from "next/link";
import { useUserAuth } from "@/_utils/auth-context";
import { useRouter } from "next/navigation";

export default function SideBar({ children }) {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="drawer lg:drawer-open pt-0.5">
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
        <ul className="menu bg-base-100 border-r-1 border-base-300 min-h-full w-80 pt-8 p-4 gap-4 text-xl font-light text-gray-500">
          {/* Sidebar content here */}
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/collection">Collection</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
          {user ? (
            <li>
              <a onClick={handleSignOut}>Log Out</a>
            </li>
          ) : (
            <li>
              <a onClick={handleSignIn}>Sign In</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
