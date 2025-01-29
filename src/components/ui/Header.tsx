"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "./avatar";
import { Session } from "next-auth";

function Header({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        {" "}
        <Image src={"/icons/logo.svg"} alt="Logo" width={40} height={40} />
      </Link>

      <ul className="flex items-center gap-8">
        <li>
          <Link
            href={"/library"}
            className={cn(
              "cursor-pointer text-base capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100",
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback className="bg-primary font-serif">
                {getInitials(session.user?.name as string)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
