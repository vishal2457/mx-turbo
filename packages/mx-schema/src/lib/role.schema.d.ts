import { z } from 'zod';
export declare const TB_role: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "role";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "role";
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
            tableName: "role";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "role";
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
export declare const Z_role_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
    description: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    description: string;
    id?: number | undefined;
}, {
    name: string;
    description: string;
    id?: number | undefined;
}>;
export declare const Z_role: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    name: string;
    description: string;
}, {
    id: number;
    name: string;
    description: string;
}>;
export type TRole = z.infer<typeof Z_role>;
//# sourceMappingURL=role.schema.d.ts.map