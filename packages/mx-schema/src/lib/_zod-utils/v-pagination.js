"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c_pagination = exports.v_pagination = void 0;
const zod_1 = require("zod");
exports.v_pagination = zod_1.z.object({
    page: zod_1.z.coerce.number(),
    limit: zod_1.z.coerce.number(),
});
exports.c_pagination = zod_1.z
    .function()
    .args(zod_1.z.object({
    page: zod_1.z.coerce.number(),
    limit: zod_1.z.coerce.number(),
}))
    .returns(zod_1.z.object({
    limit: zod_1.z.number(),
    offset: zod_1.z.number(),
}))
    .implement(({ page, limit }) => {
    return {
        offset: (page - 1) * limit,
        limit,
    };
});
