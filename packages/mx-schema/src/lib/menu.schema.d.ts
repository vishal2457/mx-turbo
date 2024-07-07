import { z } from 'zod';
export declare const TB_menu: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "menu";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "menu";
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
            tableName: "menu";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        icon: import("drizzle-orm/pg-core").PgColumn<{
            name: "icon";
            tableName: "menu";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        link: import("drizzle-orm/pg-core").PgColumn<{
            name: "link";
            tableName: "menu";
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
            tableName: "menu";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        parent: import("drizzle-orm/pg-core").PgColumn<{
            name: "parent";
            tableName: "menu";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const Z_menu_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
    link: z.ZodString;
    active: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    icon: z.ZodString;
    parent: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    link: string;
    icon: string;
    id?: number | undefined;
    active?: boolean | null | undefined;
    parent?: number | null | undefined;
}, {
    name: string;
    link: string;
    icon: string;
    id?: number | undefined;
    active?: boolean | null | undefined;
    parent?: number | null | undefined;
}>;
export declare const Z_menu: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    icon: z.ZodString;
    link: z.ZodString;
    active: z.ZodNullable<z.ZodBoolean>;
    parent: z.ZodNullable<z.ZodNumber>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    name: string;
    link: string;
    active: boolean | null;
    icon: string;
    parent: number | null;
}, {
    id: number;
    name: string;
    link: string;
    active: boolean | null;
    icon: string;
    parent: number | null;
}>;
export type TMenu = z.infer<typeof Z_menu>;
//# sourceMappingURL=menu.schema.d.ts.map