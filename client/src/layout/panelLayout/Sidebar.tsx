import { LeafIconLogo } from "@/assets/logos/LeafIconLogo";
import { themeColors } from "@/theme";
import { Link, useMatch, useMatches, useParams, useRouterState } from "@tanstack/react-router";
import { Menu } from "antd";
import { BadgeIndianRupee, CircleUserRound, LayoutDashboard } from "lucide-react";
import { ReactNode } from "react";

type TSidebarItem = {
    key: string;
    label: string;
    route: string;
    activeUrls: string[];
    icon: ReactNode;
}

const sidebarItems: TSidebarItem[] = [
    {
        key: "dashboard",
        label: "Dashboard",
        route: "/dashboard",
        activeUrls: ["/dashboard", "/dashboard/"],
        icon: <LayoutDashboard />,
    },
    {
        key: "profile",
        label: "Profile",
        route: "/profile",
        activeUrls: ["/profile", "/profile/"],
        icon: <CircleUserRound />,
    },
]

const SidebarItem = ({ item }: { item: TSidebarItem }) => {
    const route = useRouterState();
    const activePath = route.location.pathname
    console.log("pathName", route.location.pathname, item?.activeUrls?.includes(activePath))
    return (
        <Link
            to={item?.route}
            className={`flex justify-center p-2 hover:text-green-500 hover:bg-green-100 ${item?.activeUrls?.includes(activePath) ? "text-green-600 bg-green-200" : "[&.active]:text-green-600 [&.active]:bg-green-200"}`}
        >
            {item?.icon}
        </Link>
    )
}

export const Sidebar = () => {
    return (
        <>
            <div
                className={"w-20 h-full"}
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${themeColors.colorPrimary2} 1%, ${themeColors.colorPrimary})`,
                }}
            >
                <div className={"flex justify-center mb-12 text-white"}>
                    <LeafIconLogo size={50} />
                </div>
                <ul className={"flex flex-col gap-6 items-center"}>
                    {sidebarItems?.map((item) => (
                        <li key={item?.key} className={"w-full"}>
                            <SidebarItem item={item} />
                        </li>
                    ))}
                </ul>
            </div>
            {/* <Menu defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} /> */}
        </>
    );
}