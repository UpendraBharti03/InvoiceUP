import { z } from "zod";
import { CustomerZS } from "@/@types/zodSchema/customerZS";

export const CustomerFormZS = CustomerZS.omit({
    _id: true,
    userId: true,
}).extend({});

export type TCustomerFormZS = z.infer<typeof CustomerFormZS>;