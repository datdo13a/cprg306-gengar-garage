"use client";

import { usePathname } from "next/navigation";
import NavBar from "./navbar";
import Footer from "./footer";
import SideBar from "./sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isSignInPage = pathname === "/sign-in";

  if (isHomePage | isSignInPage) {
    // For home page, render children without layout components
    return <>{children}</>;
  }

  // For all other pages, render with layout components
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SideBar>
        <main className="flex-1">{children}</main>
        <Footer />
      </SideBar>
    </div>
  );
}
