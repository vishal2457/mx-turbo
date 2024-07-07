export declare const TB_customerFcm: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "customerFcm";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "customerFcm";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        customerID: import("drizzle-orm/pg-core").PgColumn<{
            name: "customerID";
            tableName: "customerFcm";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        token: import("drizzle-orm/pg-core").PgColumn<{
            name: "token";
            tableName: "customerFcm";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const Z_customerFcm_insert: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    customerID: import("zod").ZodNumber;
    token: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    customerID: number;
    token: string;
    id?: number | undefined;
}, {
    customerID: number;
    token: string;
    id?: number | undefined;
}>;
export declare const Z_customerFcm: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    customerID: import("zod").ZodNumber;
    token: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    customerID: number;
    token: string;
}, {
    id: number;
    customerID: number;
    token: string;
}>;
//# sourceMappingURL=customer-fcm.schema.d.ts.map