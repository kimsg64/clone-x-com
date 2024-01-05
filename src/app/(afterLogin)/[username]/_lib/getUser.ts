import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/react-query";

export const getUser: QueryFunction<User, [_1: string, string]> = async ({ queryKey }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`http://localhost:9090/api/user/${username}`, {
        next: {
            tags: ["user", username],
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};
