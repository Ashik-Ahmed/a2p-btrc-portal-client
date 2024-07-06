"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "../ClickOutside/ClickOutside";
import fullLogo from "../../../../public/images/Info-Logo.png";
import useLocalStorage from "../../../hooks/useLocalStorage";


const menuGroups = [
    {
        name: "MENU",
        menuItems: [
            {
                icon: "",
                label: "Dashboard",
                route: "/",

            },
            {
                icon: "",
                label: "Home",
                route: "/home",
            },
            {
                icon: "",
                label: "Client Page",
                route: "/client-page",
            },
            {
                icon: "",
                label: "Manage Users",
                route: "/manage-users",
            },
        ],
    },
    {
        name: "Reports",
        menuItems: [
            {
                icon: "",
                label: "A2P Summary Report",
                route: "/a2p-summary-report",

            },
            {
                icon: "",
                label: "A2P Details Report",
                route: "/a2p-details-report",

            },
        ],
    },
    {
        name: "OTHERS",
        menuItems: [
            {
                icon: "",
                label: "Chart",
                route: "/chart",
            },
            {
                icon: "",
                label: "UI Elements",
                route: "#",
                children: [
                    { label: "Alerts", route: "/ui/alerts" },
                    { label: "Buttons", route: "/ui/buttons" },
                ],
            },
            {
                icon: "",
                label: "Authentication",
                route: "#",
                children: [
                    { label: "Sign In", route: "/auth/signin" },
                    { label: "Sign Up", route: "/auth/signup" },
                ],
            },
        ],
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear  lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between gap-2 px-2 w-full bg-white">
                    <Link href="/">
                        <Image
                            width={176}
                            height={32}
                            src={fullLogo}
                            alt="Logo"
                            priority
                            className="p-1 bg-white"
                        />
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        className="block lg:hidden p-4"
                    >
                        <svg
                            className="fill-black"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear"
                    style={{
                        msOverflowStyle: 'none', // IE and Edge
                        scrollbarWidth: 'none', // Firefox
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch', // for smooth scrolling on iOS
                    }}
                >
                    <style jsx>{`
        div::-webkit-scrollbar {
          display: none; // Safari and Chrome
        }
      `}</style>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-5 px-2 py-4 lg:mt-9 lg:px-2">
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                    {group.name}
                                </h3>

                                <ul className="mb-6 flex flex-col gap-1.5">
                                    {group.menuItems.map((menuItem, menuIndex) => (
                                        <SidebarItem
                                            key={menuIndex}
                                            item={menuItem}
                                            pageName={pageName}
                                            setPageName={setPageName}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;
