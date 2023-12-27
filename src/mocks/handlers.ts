import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/login", () => {
        return HttpResponse.json(
            {
                userId: 1,
                nickname: "zerocho",
                id: "zerocho",
                image: "/5Udwvqim.jpg",
            },
            {
                headers: {
                    "Set-cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
                },
            }
        );
    }),
    http.post("/api/logout", () => {
        return new HttpResponse(null, {
            headers: {
                "Set-cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
            },
        });
    }),
    http.post("/api/users", async ({ request }) => {
        const req = await request.json();
        console.log("회원가입", req);
        // return HttpResponse.text(JSON.stringify("user_exists"), { status: 403 });
        return HttpResponse.text(JSON.stringify("ok"), {
            headers: {
                "Set-cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
            },
        });
    }),
];
