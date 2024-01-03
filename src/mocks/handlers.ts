import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

function generateDate() {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);
    return faker.date.between({
        from: lastWeek,
        to: Date.now(),
    });
}

const User = [
    { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
    { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
    { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];

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

    http.get("/api/postRecommends", ({ request }) => {
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
                Images: [],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                    { imageId: 4, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get("/api/followingPosts", ({ request }) => {
        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} Stop following me. I'm too famous`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} Stop following me. I'm too famous`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} Stop following me. I'm too famous`,
                Images: [],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} Stop following me. I'm too famous`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                    { imageId: 4, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} Stop following me. I'm too famous`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
        ]);
    }),
    http.get("/api/search/:tag", ({ request, params }) => {
        const { tag } = params;

        return HttpResponse.json([
            {
                postId: 1,
                User: User[0],
                content: `${1} 검색 결과 ${tag}`,
                Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
                createdAt: generateDate(),
            },
            {
                postId: 2,
                User: User[0],
                content: `${2} 검색 결과 ${tag}`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 3,
                User: User[0],
                content: `${3} 검색 결과 ${tag}`,
                Images: [],
                createdAt: generateDate(),
            },
            {
                postId: 4,
                User: User[0],
                content: `${4} 검색 결과 ${tag}`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                    { imageId: 4, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
            {
                postId: 5,
                User: User[0],
                content: `${5} 검색 결과 ${tag}`,
                Images: [
                    { imageId: 1, link: faker.image.urlLoremFlickr() },
                    { imageId: 2, link: faker.image.urlLoremFlickr() },
                    { imageId: 3, link: faker.image.urlLoremFlickr() },
                ],
                createdAt: generateDate(),
            },
        ]);
    }),
];
