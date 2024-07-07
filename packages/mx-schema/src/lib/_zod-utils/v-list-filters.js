"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v_list_filters = void 0;
const zod_1 = require("zod");
exports.v_list_filters = zod_1.z.object({
    page: zod_1.z.coerce.number(),
    limit: zod_1.z.coerce.number(),
    fields: zod_1.z.string().transform((str = '') => {
        return str?.length ? str.split(',').filter((s) => !!s) : [];
    }),
    sort: zod_1.z
        .string()
        .transform((str, ctx) => {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid sort options' });
            return zod_1.z.NEVER;
        }
    }),
    filters: zod_1.z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid filters' });
            return zod_1.z.NEVER;
        }
    }),
});
