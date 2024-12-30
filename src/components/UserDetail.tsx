import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserDetail = ({
  user,
}: {
  user: { username: string; isAcceptingMessages: boolean };
}) => {
  const { username, isAcceptingMessages } = user;

  return (
    <div className="flex border rounded-md hover:bg-slate-50 cursor-pointer py-4 px-6 w-full md:w-[48%] gap-x-12">
      <div className="aspect-square w-14 h-14 rounded-full cursor-pointer bg-black/90 flex justify-center items-center">
        <span className="capitalize text-white">{username?.slice(0, 1)}</span>
      </div>
      <div className="flex flex-col gap-y-3">
        <span>{username}</span>

        <span>
          isAcceptingMessages:
          {isAcceptingMessages ? (
            <span className="bg-green-400 py-2 px-3 rounded-md ml-3">
              {" "}
              Yes{" "}
            </span>
          ) : (
            <span className="bg-red-400 py-2 px-3 rounded-md ml-3">No</span>
          )}
        </span>
        {isAcceptingMessages && (
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`}
            className="flex gap-x-2 justify-center items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Send Reviews
            <ExternalLinkIcon className="h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
