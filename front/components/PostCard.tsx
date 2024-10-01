import { useAuthState } from "@/context/auth";
import { Post } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface PostCardProps {
  post: Post;
  subMutate?: () => void;
}

const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  subMutate,
}: PostCardProps) => {
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]";
  const { authenticated } = useAuthState();
  const vote = async (value: Number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) {
      value = 0;
    }

    try {
      await axios.post("/votes", { identifier, slug, value });
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mb-4 bg-white rounded" id={identifier}>
      <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}
        >
          {userVote === 1 ? (
            <FaArrowUp className="mx-auto text-red-500" />
          ) : (
            <FaArrowUp className="mx-auto" />
          )}
        </div>
        <p className="text-xs font-bold">{voteScore}</p>
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
          onClick={() => vote(-1)}
        >
          {userVote === -1 ? (
            <FaArrowDown className="mx-auto text-blue-500" />
          ) : (
            <FaArrowDown className="mx-auto" />
          )}
        </div>
      </div>
      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${subName}`}>
            {sub && (
              <Image
                src={sub?.imageUrl}
                alt="sub"
                className="rounded-full cursor-pointer"
                width={12}
                height={12}
              />
            )}
          </Link>
          <Link href={`/r/${subName}`}>
            <span className="ml-2 text-xs font-bold cursor-pointer hover:underline">
              /r/{subName}
            </span>
          </Link>
          <span className="mx-1 text-xs text-gray-400">*</span>

          <p className="text-xs text-gray-400">
            Posted by
            <Link href={`/r/${username}`}>
              <span className="mx-1 hover:underline">/u/{username}</span>
            </Link>
            <Link href={url}>
              <span className="mx-1 hover:underline">
                {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
              </span>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <span className="my-1 text-lg font-medium">{title}</span>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          <Link href={url}>
            <span>
              <i className="mr-1 fas fa-comment-alt fa-xs"></i>
              <span>{commentCount}</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
