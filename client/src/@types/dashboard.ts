import { z } from "zod";

export const DashboardAnalyticsDataResultZS = z.object({
    customersCount: z.number(),
    productsCount: z.number(),
    invoice: z.object({
        totalInvoices: z.number(),
        totalInvoiceAmount: z.number(),
        unpaidInvoiceAmount: z.number(),
        paidInvoiceAmount: z.number(),
        overDueInvoices: z.number(),
        unpaidInvoices: z.number(),
        // partialInvoices: z.number(),
        paidInvoices: z.number(),
    }),
})

export type TDashboardAnalyticsDataResultZS = z.infer<typeof DashboardAnalyticsDataResultZS>;