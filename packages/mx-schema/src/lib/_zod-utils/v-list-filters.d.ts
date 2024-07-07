import { z } from 'zod';
export interface FilterData {
    type: 'text' | 'number' | 'select' | 'date';
    value: number | string;
    field: string;
    condition: 'equals' | 'greater than' | 'less than' | 'between' | 'contains' | 'not equal';
}
export declare const v_list_filters: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    fields: z.ZodEffects<z.ZodString, string[], string>;
    sort: z.ZodEffects<z.ZodString, Partial<{
        Asc: string;
        Desc: string;
    }>, string>;
    filters: z.ZodEffects<z.ZodString, Record<string, string>, string>;
}, "strip", z.ZodTypeAny, {
    sort: Partial<{
        Asc: string;
        Desc: string;
    }>;
    page: number;
    limit: number;
    fields: string[];
    filters: Record<string, string>;
}, {
    sort: string;
    page: number;
    limit: number;
    fields: string;
    filters: string;
}>;
export type ListFilters = z.infer<typeof v_list_filters>;
//# sourceMappingURL=v-list-filters.d.ts.map