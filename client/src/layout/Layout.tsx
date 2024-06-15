import { ReactNode, useEffect, useMemo } from "react";
import PanelLayout from "@/layout/panelLayout/PanelLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserProfile } from "@/redux/slices/authSlice";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from "antd";

const CustomLayout = ({children}: {children: ReactNode}) => {
    const dispatch = useDispatch<AppDispatch>();

    const profile = useMemo(() => {
        const profile = dispatch(getUserProfile());
        return profile;
    }, []);

    if (!profile) {
        <Flex className={"h-screen w-full bg-color-bg-layout"} justify={"center"} align={"center"}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Flex>
    }
    // Other layouts will appear here with condition (for future use)
    // if (userType === .....)

    // default layout
    return (
        <PanelLayout>
            {children}
        </PanelLayout>
    );
}

export default CustomLayout;