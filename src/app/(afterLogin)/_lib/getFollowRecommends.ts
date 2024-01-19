export const getFollowRecommends = async () => {
    const res = await fetch(`http://localhost:9090/api/users/followRecommends`, {
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
