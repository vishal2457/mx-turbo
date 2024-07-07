import { z } from 'zod';
export declare const v_pagination: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page: number;
    limit: number;
}>;
export declare const c_pagination: (args_0: {
    page: number;
    limit: number;
}, ...args_1: unknown[]) => ReturnType<({ page, limit }: {
    page: number;
    limit: number;
}) => {
    offset: number;
    limit: number;
}>;
export type t_pagination = z.infer<typeof v_pagination>;
//# sourceMappingURL=v-pagination.d.ts.map