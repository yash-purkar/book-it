"use client";

import Link from "next/link";
import React, { ReactNode, useState } from "react";
import styles from "./adminSidebar.module.css";
import { usePathname } from "next/navigation";

type Menu = "Dashboard" | "Rooms" | "Bookings" | "Users" | "Reviews";

interface MenuItem {
  name: Menu;
  url: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", url: "/admin/dashboard", icon: "fas fa-tachometer-alt" },
  {
    name: "Rooms",
    url: "/admin/rooms",
    icon: "fas fa-hotel",
  },
  {
    name: "Bookings",
    url: "/admin/bookings",
    icon: "fas fa-receipt",
  },
  {
    name: "Users",
    url: "/admin/users",
    icon: "fas fa-user",
  },
  {
    name: "Reviews",
    url: "/admin/reviews",
    icon: "fas fa-star",
  },
];

export const AdminSidebar = () => {
  const url = usePathname();
  const [activeMenu, setActiveMenu] = useState<string>(url);
  const handleTabChange = (menuItem: Menu) => {
    setActiveMenu(menuItem);
  };

  return (
    <div className={` list-group mt-5 pl-4`}>
      {menuItems.map(
        (item: MenuItem): ReactNode => (
          <Link
            key={item.name}
            href={item.url}
            className={`fw-bold ${
              styles["list-group-item"]
            } list-group-item-action ${
              item.url === activeMenu && styles["active"]
            }`}
            aria-current={activeMenu === item.url ? "true" : "false"}
            onClick={() => handleTabChange(item.name)}
          >
            <i className={item.icon}></i> {item.name}
          </Link>
        )
      )}
    </div>
  );
};
