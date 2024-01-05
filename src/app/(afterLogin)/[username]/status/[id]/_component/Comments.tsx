"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getComments } from "../_lib/getComments";

type Props = {
    id: string;
};

export default function Comments({ id }: Props) {
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData(["posts", id]);
    const { data } = useQuery<IPost[], Object, IPost[], [_1: string, string, _2: string]>({
        queryKey: ["posts", id, "comments"],
        queryFn: getComments,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!post,
    });

    if (post) {
        return data?.map((post) => <Post key={post.postId} post={post} />);
    }

    return null;
}
