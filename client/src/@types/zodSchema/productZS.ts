import { messages } from "@/messages";
import { z } from "zod";

export const ProductMeasurementUnit = {
    "ITEM": "item",
    "KG": "kg",
    "LITER": "liter",
    "METER": "meter",
}

export const ProductZS = z.object({
    _id: z.string(),
    userId: z.string(),
    productName: z.string().min(1, messages.PRODUCT_NAME_REQUIRED),
    productDescription: z.string().optional(),
    measurementUnit: z.nativeEnum(ProductMeasurementUnit).default(ProductMeasurementUnit.ITEM),
    price: z.number().min(1, messages.PRODUCT_PRICE_REQUIRED),
    taxRate: z.number().optional(),
    totalAmount: z.number(),
})

export type TProductZS = z.infer<typeof ProductZS>;