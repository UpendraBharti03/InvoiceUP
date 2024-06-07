import { InvoiceZS } from "@/@types/zodSchema/invoiceZS";
import { z } from "zod";

export const InvoiceFormZS = InvoiceZS.omit({
    _id: true,
    userId: true,
}).extend({});

export type TInvoiceFormZS = z.infer<typeof InvoiceFormZS>;