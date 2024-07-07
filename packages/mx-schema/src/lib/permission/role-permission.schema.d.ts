import { z } from 'zod';
export declare const TB_rolePermission: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "rolePermission";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "rolePermission";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        permissionID: import("drizzle-orm/pg-core").PgColumn<{
            name: "permissionID";
            tableName: "rolePermission";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        roleID: import("drizzle-orm/pg-core").PgColumn<{
            name: "roleID";
            tableName: "rolePermission";
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
export declare const Z_rolePermission: z.ZodObject<{
    id: z.ZodNumber;
    permissionID: z.ZodNumber;
    roleID: z.ZodNumber;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    roleID: number;
    permissionID: number;
}, {
    id: number;
    roleID: number;
    permissionID: number;
}>;
export declare const Z_rolePermission_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    roleID: z.ZodNumber;
    permissionID: z.ZodNumber;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    roleID: number;
    permissionID: number;
    id?: number | undefined;
}, {
    roleID: number;
    permissionID: number;
    id?: number | undefined;
}>;
export type TRolePermission = z.infer<typeof Z_rolePermission>;
//# sourceMappingURL=role-permission.schema.d.ts.map