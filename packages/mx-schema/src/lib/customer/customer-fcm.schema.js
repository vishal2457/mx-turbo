"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_customerFcm = exports.Z_customerFcm_insert = exports.TB_customerFcm = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const customer_schema_1 = require("./customer.schema");
exports.TB_customerFcm = (0, pg_core_1.pgTable)('customerFcm', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    customerID: (0, pg_core_1.integer)('customerID')
        .references(() => customer_schema_1.TB_customer.id)
        .notNull(),
    token: (0, pg_core_1.text)('token').notNull(),
});
exports.Z_customerFcm_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_customerFcm);
exports.Z_customerFcm = (0, drizzle_zod_1.createSelectSchema)(exports.TB_customerFcm);
