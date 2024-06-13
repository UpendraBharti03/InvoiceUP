import { Col, Flex, Row, Spin, Statistic, theme } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Banknote, Frown, HandCoins, Handshake, ReceiptText, Store, Users } from "lucide-react";
import { ACard } from "@ant-ui";
import { useGetDashboardAnalyticsData } from "@/services/dashboardService";

const DashboardPage = () => {
    const { token: themeToken } = theme.useToken();
    const { data: dashboardAnalyticsData, isLoading: isDashboardAnalyticsDataLoading } = useGetDashboardAnalyticsData();

    if (isDashboardAnalyticsDataLoading) {
        return (
            <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
        )
    }

    if (!dashboardAnalyticsData) {
        return <></>
    }

    return (
        <div>
            <Row gutter={[10, 10]}>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Customers"}
                            value={dashboardAnalyticsData?.customersCount}
                            prefix={<Users className="w-5 h-5 mr-2" />}
                        />
                    </ACard>
                </Col>

                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Products"}
                            value={dashboardAnalyticsData?.productsCount}
                            prefix={<Store className="w-5 h-5 mr-2" />}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Invoices"}
                            value={dashboardAnalyticsData?.invoice?.totalInvoices}
                            prefix={<ReceiptText className="w-5 h-5 mr-2" />}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Total invoice amount"}
                            value={dashboardAnalyticsData?.invoice?.totalInvoiceAmount}
                            prefix={<Banknote className="w-5 h-5 mr-2" />}
                            precision={2}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Unpaid invoice amount"}
                            value={dashboardAnalyticsData?.invoice?.unpaidInvoiceAmount}
                            prefix={<HandCoins className="w-5 h-5 mr-2" />}
                            precision={2}
                            valueStyle={{ color: themeToken?.colorErrorText }}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Paid invoice amount"}
                            value={dashboardAnalyticsData?.invoice?.paidInvoiceAmount}
                            prefix={<Handshake className="w-5 h-5 mr-2" />}
                            precision={2}
                            valueStyle={{ color: themeToken?.colorSuccessActive }}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Overdue invoices"}
                            value={dashboardAnalyticsData?.invoice?.overDueInvoices}
                            prefix={<Frown className="w-5 h-5 mr-2" />}
                            valueStyle={{ color: themeToken?.colorErrorActive }}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Unpaid invoices"}
                            value={dashboardAnalyticsData?.invoice?.unpaidInvoices}
                            prefix={<HandCoins className="w-5 h-5 mr-2" />}
                            valueStyle={{ color: themeToken?.colorError }}
                        />
                    </ACard>
                </Col>
                <Col span={12}>
                    <ACard bordered={false}>
                        <Statistic
                            title={"Paid invoices"}
                            value={dashboardAnalyticsData?.invoice?.paidInvoices}
                            prefix={<Handshake className="w-5 h-5 mr-2" />}
                            valueStyle={{ color: themeToken?.colorSuccess }}
                        />
                    </ACard>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPage;