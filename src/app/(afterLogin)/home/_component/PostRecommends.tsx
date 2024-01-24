"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
    const { data, fetchNextPage, hasNextPage, isFetching, isPending, isError } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
        initialPageParam: 0,
        // getNextPageParam: (lastPage) => lastPage.at(-1)!.postId + 5,
        getNextPageParam: (lastPage) => lastPage?.at(-1)?.postId,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    console.log("is there some data?", data);

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 1,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((post) => (
                        <Post key={post?.postId} post={post} />
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </>
    );
}
