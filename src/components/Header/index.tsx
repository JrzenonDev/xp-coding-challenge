"use client";

import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "antd";
import { menuList } from "@/src/constants/menuList";
import avatarPeaple from "@/src/assets/images/avatar.jpeg";
import userIcon from "@/src/assets/images/user.png";
import logoutIcon from "@/src/assets/images/logout.png";

export function Header() {
  const customMenu = (
    <div className="p-4 bg-white border rounded-lg shadow-lg">
      <div className="flex items-center py-2">
        <Image src={userIcon} alt="User" width={24} height={24} />
        <div className="ml-2">
          <p className="text-2xl font-bold">My Profile</p>
          <p>Change settings of your account.</p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex items-center py-2">
        <Image src={logoutIcon} alt="User" width={24} height={24} />
        <div className="ml-2">
          <p className="text-2xl font-bold">Logout</p>
        </div>
      </div>
    </div>
  );

  return (
    <header className="flex items-center justify-between p-6 bg-[#1E1ADD] text-white h-16 rounded-[5px]">
      <div className="flex items-center">
        <Link href="/" className="mr-12 font-bold text-2xl">
          LOGO
        </Link>
        <nav>
          <ul className="flex gap-10 font-medium text-base">
            {menuList.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <Dropdown overlay={customMenu} trigger={["click"]}>
          <button
            className="flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            <div className="w-[39px] h-[39px] rounded-full border-2 border-white hover:opacity-80">
              <Image
                src={avatarPeaple}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
