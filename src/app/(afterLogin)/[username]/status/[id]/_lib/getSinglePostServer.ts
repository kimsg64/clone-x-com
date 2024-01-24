import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

// export const getSinglePost: QueryFunction<Post, [_1: string, string]> = async ({ queryKey }) => {
export const getSinglePostServer = async ({ queryKey }: { queryKey: [string, string] }) => {
    const [_1, id] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
        next: {
            tags: ["posts", id],
        },
        headers: { Cookie: cookies().toString() },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
