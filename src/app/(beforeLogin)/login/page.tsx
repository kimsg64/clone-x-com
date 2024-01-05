"use client";

import Main from "@/app/(beforeLogin)/_component/Main";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();

    const { data: session } = useSession();

    if (session?.user) {
        router.replace("home");
        return null;
    }

    router.replace("/i/flow/login");
    return <Main />;
}
