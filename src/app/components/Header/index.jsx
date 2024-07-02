"use client";
import Link from "next/link";
import Image from "next/image";
import DropdownUser from "./DropdownUser";
import logo from "../../../../public/images/Info-Logo-only.png"

const Header = ({ sidebarOpen, setSidebarOpen, session }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-1 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
              console.log("clicked");
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm  lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
              <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
            </svg>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="lg:flex-grow"></div>
        <div className="lg:flex items-center gap-4">
          {/* <!-- User Area --> */}
          <DropdownUser session={session} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
