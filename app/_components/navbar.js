"use client";
import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "@/_utils/auth-context";
import { useRouter } from "next/navigation";

export default function NavBar() {
  // work on making the profile image on navbar persist throughout the website
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  async function handleSignOut() {
    try {
      await firebaseSignOut();
      console.log("signing out");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="ml-2 mt-5 mb-5 mr-2">
        <div
          onClick={() => router.push("/profile")}
          className="hover: cursor-pointer"
        >
          <Image
            src="/gengar-garage-icon.png"
            alt="gengarGarage"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="flex-1">
        <a
          className="btn btn-ghost text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          onClick={() => router.push("/profile")}
        >
          Gengar Garage
        </a>
      </div>

      {user ? (
        <div className="flex gap-10">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </a>
              </li>
              <li>
                <a onClick={handleSignOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
