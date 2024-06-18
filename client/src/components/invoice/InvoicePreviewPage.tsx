import { InvoicePreview } from '@/components/invoice/preview/InvoicePreview'
import { useGetInvoiceDetails } from '@/services/invoiceService'
import { useParams } from '@tanstack/react-router'
import { Flex, Spin } from 'antd'
import { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';

const InvoicePreviewPage = () => {
    const { invoiceId }: { invoiceId: string } = useParams({ strict: false })
    const { data: invoiceDetails, isLoading: isInvoiceDetailsLoading } = useGetInvoiceDetails({ _id: invoiceId })
    useEffect(() => {
      if (!isInvoiceDetailsLoading && invoiceDetails) {
        window.print()
      }
    }, [isInvoiceDetailsLoading, invoiceDetails])

    if (isInvoiceDetailsLoading) {
      return (
        <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </Flex>
      )
    }

    if (!invoiceDetails) {
      return <></>
    }

    return (
      <div className={"bg-white"}>
        <InvoicePreview invoiceDetails={invoiceDetails} />
      </div>
    )
  }

  export default InvoicePreviewPage;