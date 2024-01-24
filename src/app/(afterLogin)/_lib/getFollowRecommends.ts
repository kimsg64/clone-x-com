export const getFollowRecommends = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`, {
        next: {
            tags: ["users", "followRecommends"], // posts, followings ?????
        },
        cache: "no-store",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
