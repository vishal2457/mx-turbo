import { z } from 'zod';
export declare const TB_notification: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "notifications";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "notifications";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        body: import("drizzle-orm/pg-core").PgColumn<{
            name: "body";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        image: import("drizzle-orm/pg-core").PgColumn<{
            name: "imageUrl";
            tableName: "notifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "notifications";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        udpatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updatedAt";
            tableName: "notifications";
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
export declare const Z_notification_insert: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    title: z.ZodString;
    body: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    udpatedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    title: string;
    body: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    image?: string | null | undefined;
    udpatedAt?: Date | null | undefined;
}, {
    title: string;
    body: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    image?: string | null | undefined;
    udpatedAt?: Date | null | undefined;
}>;
export declare const Z_notification: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    body: z.ZodString;
    image: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    udpatedAt: z.ZodNullable<z.ZodDate>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    title: string;
    body: string;
    image: string | null;
    udpatedAt: Date | null;
}, {
    id: number;
    createdAt: Date;
    title: string;
    body: string;
    image: string | null;
    udpatedAt: Date | null;
}>;
export type TNotification = z.infer<typeof Z_notification>;
//# sourceMappingURL=notification.schema.d.ts.map