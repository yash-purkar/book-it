"use client"

import Link from "next/link";
import React, { ReactNode, useState } from "react";
import styles from './UserMenuSidebar.module.css'

type Menu = "Update Profile" | "Upload Avatar" | "Update Password";

interface MenuItem {
  name: Menu;
  url: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Update Profile", url: "/me/update", icon: "fas fa-user" },
  {
    name: "Upload Avatar",
    url: "/me/upload-avatar",
    icon: "fas fa-user-circle",
  },
  {
    name: "Update Password",
    url: "/me/update-password",
    icon: "fas fa-lock",
  },
];

export const UserMenuSidebar = () => {
const [activeMenu,setActiveMenu] = useState<Menu>(menuItems[0].name);

const handleTabChange = (menuItem:Menu) => {
  setActiveMenu(menuItem)
}

  return (
    <div className={` list-group mt-5 pl-4`}>
      {menuItems.map(
        (item: MenuItem): ReactNode => (
          <Link
            key={item.name}
            href={item.url}
            className={`fw-bold ${styles['list-group-item']} list-group-item-action ${item.name === activeMenu && styles['active']}`}
            aria-current={activeMenu === item.name ? "true" : "false"}
            onClick={() =>handleTabChange(item.name)}
          >
            <i className={item.icon}></i>{" "}
            {item.name}
          </Link>
        )
      )}
    </div>
  );
};
