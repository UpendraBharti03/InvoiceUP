import { cn } from "@ant-ui";
import { capitalizeFirstLetter } from "@ui-helpers";
import { TInvoiceFormZS } from "@/@types/invoice";
import { InvoiceStatus, TInvoiceZS } from "@/@types/zodSchema/invoiceZS";
import React from "react";

export const InvoicePreview = ({ invoiceDetails }: { invoiceDetails: TInvoiceZS | TInvoiceFormZS }) => {

    return (
        <div className={"bg-white rounded w-full h-full mb-10"}>
            <div className={"flex justify-end"}>
                <div>
                    <h6 className={"text-xl font-semibold"}>Invoice</h6>
                    {invoiceDetails?.status && <div className={cn("text-lg p-1 rounded-xl")}>{capitalizeFirstLetter(invoiceDetails?.status)}</div>}
                </div>
            </div>

            {/* Customer details */}
            <div className={"mb-2"}>
                {invoiceDetails?.dueDate && <div>Due date: {invoiceDetails?.dueDate}</div>}
                {invoiceDetails?.customer && (
                    <div>
                        {invoiceDetails?.customer?.name?.fullName && <span>{invoiceDetails?.customer?.name?.fullName}</span>}
                        {invoiceDetails?.customer?.email && <span>{invoiceDetails?.customer?.email}</span>}
                        {invoiceDetails?.customer?.phone && <span>{invoiceDetails?.customer?.phone}</span>}
                        {invoiceDetails?.customer?.address && <span>{invoiceDetails?.customer?.address}</span>}
                    </div>
                )}
            </div>

            {/* Product items */}
            <div className={"grid grid-cols-5 border-y"}>
                <>
                    <div className={"font-semibold truncate"}>Product</div>
                    <div className={"font-semibold truncate"}>Qty</div>
                    <div className={"font-semibold truncate"}>Unit price</div>
                    <div className={"font-semibold truncate"}>Discount</div>
                    <div className={"font-semibold truncate"}>Amount</div>
                </>
                {invoiceDetails?.productItems?.map((productItem, productItemIndex) => {
                    const amount = productItem?.quantity * (productItem?.unitPrice - (productItem?.unitPrice * (productItem?.discount ?? 0)) / 100)
                    return (
                        <React.Fragment key={productItemIndex}>
                            <div className={"truncate"}>{productItem?.product?.productName}</div>
                            <div className={"truncate"}>{productItem?.quantity}</div>
                            <div className={"truncate"}>{productItem?.unitPrice}</div>
                            <div className={"truncate"}>{productItem?.discount}</div>
                            <div className={"truncate"}>{amount}</div>
                        </React.Fragment>
                    )
                })}
            </div>

            <div className={"flex justify-end"}>
            <div className={"grid grid-cols-2 max-w-[300px]"}>
                <div className={"border-b pr-2 truncate"}>Price:</div>
                <div className={"border-b truncate"}>{invoiceDetails?.totalPrice}</div>
                <div className={"border-b pr-2 truncate"}>Tax rate:</div>
                <div className={"border-b truncate"}>{invoiceDetails?.taxRate}</div>
                <div className={"font-semibold pr-2 truncate"}>Total amount:</div>
                <div className={"font-semibold truncate"}>{invoiceDetails?.totalAmount}</div>
            </div>
            </div>
        </div>
    );
}