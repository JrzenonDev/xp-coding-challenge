import Link from "next/link";
import { menuList } from "@/src/constants/menuList";
import avatarPeaple from "@/src/assets/images/avatar.jpeg";
import Image from "next/image";

export function Header() {
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
        <button>
          <div className="w-[39px] h-[39px] rounded-[50%] border-2 border-white hover:opacity-80">
            <Image
              src={avatarPeaple}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-[50%]"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
