import { ReactNode } from "react";
import PanelLayout from "@/layout/panelLayout/PanelLayout";

const CustomLayout = ({children}: {children: ReactNode}) => {

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