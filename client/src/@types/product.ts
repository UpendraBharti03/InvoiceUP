import { z } from "zod";
import { ProductZS } from "@/@types/zodSchema/productZS";

export const ProductFormZS = ProductZS.omit({
    _id: true,
    userId: true,
}).extend({});

export type TProductFormZS = z.infer<typeof ProductFormZS>;