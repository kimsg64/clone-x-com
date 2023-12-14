import React from "react";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            after login!!!
            <div>{children}</div>
        </div>
    );
}
