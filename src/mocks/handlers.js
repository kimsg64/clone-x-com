"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
var msw_1 = require("msw");
exports.handlers = [
    msw_1.http.post('/api/login', function () {
        return msw_1.HttpResponse.json({
            userId: 1,
            nickname: 'zerocho',
            id: 'zerocho',
            image: '/5Udwvqim.jpg',
        }, {
            headers: {
                'Set-cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
            },
        });
    }),
    msw_1.http.post('/api/logout', function () {
        return new msw_1.HttpResponse(null, {
            headers: {
                '': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
            },
        });
    }),
];
