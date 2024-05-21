import PanelLayout from "@/layout/panelLayout/PanelLayout";

export const layoutNames = {
    PANEL_LAYOUT: "PANEL_LAYOUT",
}

export const getLayout = ({layoutName}:{layoutName:string})=>{
    switch (layoutName) {
        case layoutNames.PANEL_LAYOUT:
            return PanelLayout
        default:
            return PanelLayout
    }
}