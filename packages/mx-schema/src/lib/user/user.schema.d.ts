import { z } from 'zod';
export declare const TB_user: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "user";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        email: import("drizzle-orm/pg-core").PgColumn<{
            name: "email";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        password: import("drizzle-orm/pg-core").PgColumn<{
            name: "password";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        active: import("drizzle-orm/pg-core").PgColumn<{
            name: "active";
            tableName: "user";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updatedAt";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const Z_user_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodString;
    password: z.ZodString;
    active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    email: string;
    password: string;
    id?: number | undefined;
    name?: string | null | undefined;
    active?: boolean | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | null | undefined;
}, {
    email: string;
    password: string;
    id?: number | undefined;
    name?: string | null | undefined;
    active?: boolean | null | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | null | undefined;
}>;
export declare const Z_user: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodNullable<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
    active: z.ZodNullable<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    name: string | null;
    email: string;
    password: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
}, {
    id: number;
    name: string | null;
    email: string;
    password: string;
    active: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
}>;
export type R_userLogin = {
    token: string;
};
export type TUser = z.infer<typeof Z_user>;
//# sourceMappingURL=user.schema.d.ts.map