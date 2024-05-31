import { ReactNode, useEffect } from "react";
import PanelLayout from "@/layout/panelLayout/PanelLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserProfile } from "@/redux/slices/authSlice";

const CustomLayout = ({children}: {children: ReactNode}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [])
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