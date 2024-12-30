"use client";

import { User2 } from "lucide-react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md sticky top-0 w-full z-500 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center w-full ">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Mystery Message
        </Link>

        <Link
          href={"/users"}
          className="font-semibold flex gap-2 shadow-lg py-2 px-6 rounded-lg hover:shadow-black/20"
        >
          Users
          <User2 />
        </Link>

        {session ? (
          <div className="flex gap-x-4">
            <Link
              href={"/dashboard"}
              className="aspect-square w-10 rounded-full cursor-pointer bg-black/90 flex justify-center items-center"
            >
              <span className="capitalize text-white">
                {user?.username?.slice(0, 1) || user?.email?.slice(0, 1)}
              </span>
            </Link>
            <Button className=" md:m-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button className="w-full md:m-auto">Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
