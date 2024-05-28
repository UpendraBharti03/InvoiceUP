import { useMatch, useMatches, useParams } from "@tanstack/react-router";
import { Menu } from "antd";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";

const sidebarItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        title: "Dashboard",
        icon: <LuLayoutDashboard />,
    },
    {
        key: "profile",
        label: "Profile",
        title: "Profile",
        icon: <CgProfile />,
    },
]

export const Sidebar = () => {
    const params = useMatches();
    return (
        <>
        <Menu defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} />
        </>
    );
}