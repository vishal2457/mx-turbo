export declare const TB_customer: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "customer";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "customer";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        deviceID: import("drizzle-orm/pg-core").PgColumn<{
            name: "deviceID";
            tableName: "customer";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        device: import("drizzle-orm/pg-core").PgColumn<{
            name: "device";
            tableName: "customer";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        removeAds: import("drizzle-orm/pg-core").PgColumn<{
            name: "removeAds";
            tableName: "customer";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const Z_customer_insert: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    deviceID: import("zod").ZodString;
    device: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    removeAds: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodBoolean>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    deviceID: string;
    id?: number | undefined;
    device?: string | null | undefined;
    removeAds?: boolean | null | undefined;
}, {
    deviceID: string;
    id?: number | undefined;
    device?: string | null | undefined;
    removeAds?: boolean | null | undefined;
}>;
export declare const Z_customer: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    deviceID: import("zod").ZodString;
    device: import("zod").ZodNullable<import("zod").ZodString>;
    removeAds: import("zod").ZodNullable<import("zod").ZodBoolean>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    deviceID: string;
    device: string | null;
    removeAds: boolean | null;
}, {
    id: number;
    deviceID: string;
    device: string | null;
    removeAds: boolean | null;
}>;
//# sourceMappingURL=customer.schema.d.ts.map