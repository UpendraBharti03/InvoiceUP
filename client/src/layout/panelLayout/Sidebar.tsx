import { useMatch, useMatches, useParams, useRouterState } from "@tanstack/react-router";
import { Menu } from "antd";
import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";

type TSidebarItem = {
    key: string;
    label: string;
    title: string;
    activeUrls: string[];
    icon: ReactNode;
}

const sidebarItems: TSidebarItem[] = [
    {
        key: "dashboard",
        label: "Dashboard",
        title: "Dashboard",
        activeUrls: ["/dashboard"],
        icon: <LuLayoutDashboard />,
    },
    {
        key: "profile",
        label: "Profile",
        title: "Profile",
        activeUrls: ["/profile"],
        icon: <CgProfile />,
    },
    {
        key: "login",
        label: "login",
        title: "login",
        activeUrls: ["/login"],
        icon: <CgProfile />,
    },
]

const SidebarItem = ({item}: {item: TSidebarItem}) => {
    const route = useRouterState();
    const activePath = route.location.pathname
    console.log("pathName", route.location.pathname, item?.activeUrls?.includes(activePath))
    return (
        <div className={`${item?.activeUrls?.includes(activePath) ? '[&.active]:bg-green' : ""}`}>
            {item?.label}
        </div>
    )
}

export const Sidebar = () => {
    const params = useMatches();
    console.log("params", params)
    return (
        <>
        <div className={"w-20"}>
            <div className={"text-green-700"}>UP</div>
            <ul className={"flex flex-col gap-2"}>
                {sidebarItems?.map((item) => (
                    <li key={item?.key}>
                        <SidebarItem item={item} />
                    </li>
                ))}
            </ul>
        </div>
        {/* <Menu defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} /> */}
        </>
    );
}