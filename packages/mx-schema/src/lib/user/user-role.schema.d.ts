import { z } from 'zod';
export declare const TB_userRole: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "userRole";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "userRole";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        roleID: import("drizzle-orm/pg-core").PgColumn<{
            name: "roleID";
            tableName: "userRole";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        userID: import("drizzle-orm/pg-core").PgColumn<{
            name: "userID";
            tableName: "userRole";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const Z_userRole_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    roleID: z.ZodNumber;
    userID: z.ZodNumber;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    roleID: number;
    userID: number;
    id?: number | undefined;
}, {
    roleID: number;
    userID: number;
    id?: number | undefined;
}>;
export declare const Z_userRole: z.ZodObject<{
    id: z.ZodNumber;
    roleID: z.ZodNumber;
    userID: z.ZodNumber;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    roleID: number;
    userID: number;
}, {
    id: number;
    roleID: number;
    userID: number;
}>;
export type TUSerRole = z.infer<typeof Z_userRole>;
//# sourceMappingURL=user-role.schema.d.ts.map