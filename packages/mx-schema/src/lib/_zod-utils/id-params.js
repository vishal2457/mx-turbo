"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v_param_id = void 0;
const zod_1 = require("zod");
exports.v_param_id = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
