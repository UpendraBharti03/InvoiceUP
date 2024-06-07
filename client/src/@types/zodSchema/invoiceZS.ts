import { z } from "zod";
import { messages } from "@/messages";
import { CustomerZS } from "@/@types/zodSchema/customerZS";
import { ProductZS } from "@/@types/zodSchema/productZS";

export const InvoiceStatus = {
    "UNPAID": "unpaid",
    "PARTIAL": "partial",
    "PAID": "paid",
}

export const ProductItem = z.object({
    productId: z.string(),
    product: ProductZS,
    quantity: z.number().min(1, messages.PRODUCT_QUANTITY_REQUIRED),
    unitPrice: z.number().min(1, messages.PRODUCT_UNIT_PRICE_REQUIRED),
    discount: z.number().optional(),
});

export const InvoiceZS = z.object({
    _id: z.string(),
    userId: z.string(),
    customerId: z.string(),
    customer: CustomerZS,
    productItems: z.array(ProductItem).min(1, messages.PRODUCT_ITEM_REQUIRED),
    status: z.nativeEnum(InvoiceStatus).default(InvoiceStatus.UNPAID),
    totalPrice: z.number(),
    taxRate: z.number().optional(),
    totalAmount: z.number(),
    dueDate: z.date(),
    invoiceDescription: z.string().optional(),
})

export type TInvoiceZS = z.infer<typeof InvoiceZS>;