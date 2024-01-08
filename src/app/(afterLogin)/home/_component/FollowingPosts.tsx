"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";

export default function FollowingPosts() {
    const { data, isPending } = useSuspenseQuery<IPost[]>({
        queryKey: ["posts", "followings"],
        queryFn: getFollowingPosts,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    console.log("is there some data?", data);

    // if (isPending) {
    //     return (
    //         <div style={{ display: "flex", justifyContent: "center" }}>
    //             <svg className={styles.loader} height="100%" viewBox="0 0 32 32" width={40}>
    //                 <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}></circle>
    //                 <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={{ stroke: "rgb(29, 155, 240)", strokeDasharray: 80, strokeDashoffset: 60 }}></circle>
    //             </svg>
    //         </div>
    //     );
    // }

    return data?.map((post) => <Post key={post.postId} post={post} />);
}
