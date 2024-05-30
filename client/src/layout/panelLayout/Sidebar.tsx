import { useMatch, useMatches, useParams, useRouterState } from "@tanstack/react-router";
import { Menu } from "antd";
import { BadgeIndianRupee, CircleUserRound, LayoutDashboard } from "lucide-react";
import { ReactNode } from "react";

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
        icon: <LayoutDashboard />,
    },
    {
        key: "profile",
        label: "Profile",
        title: "Profile",
        activeUrls: ["/profile"],
        icon: <CircleUserRound />,
    },
    {
        key: "login",
        label: "login",
        title: "login",
        activeUrls: ["/login"],
        icon: <CircleUserRound />,
    },
]

const SidebarItem = ({item}: {item: TSidebarItem}) => {
    const route = useRouterState();
    const activePath = route.location.pathname
    console.log("pathName", route.location.pathname, item?.activeUrls?.includes(activePath))
    return (
        <li key={item?.key} className="">
        <div className={`${item?.activeUrls?.includes(activePath) ? '[&.active]:bg-green' : ""}`}>
            {item?.icon}
        </div>
        </li>
    )
}

export const Sidebar = () => {
    const params = useMatches();
    console.log("params", params)
    return (
        <>
        <div className={"w-20"}>
            <div className={"flex justify-center mb-12 bg-gradient-to-t from-yellow-500 to-green-500 text-lime-700"}>
            <BadgeIndianRupee size={48} />
            </div>
            <ul className={"flex flex-col gap-6 items-center"}>
                {sidebarItems?.map((item) => (
                    <SidebarItem item={item} key={item?.key} />
                ))}
            </ul>
        </div>
        {/* <Menu defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} /> */}
        </>
    );
}