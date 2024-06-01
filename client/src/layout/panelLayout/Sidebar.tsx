import { LeafIconLogo } from "@/assets/logos/LeafIconLogo";
import { cn } from "@/libs/ant-ui";
import { logoutUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { themeColors } from "@/theme";
import { Link, redirect, useMatch, useMatches, useParams, useRouterState } from "@tanstack/react-router";
import { Menu, Popconfirm, Tooltip, theme } from "antd";
import { CircleUserRound, LayoutDashboard, LogOutIcon } from "lucide-react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

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

    return (
        <Tooltip placement="right" title={item?.label} color={themeColors.colorPrimary2}>
            <Link
            to={item?.route}
            className={cn(
                `flex justify-center p-2 text-white rounded-l-lg hover:text-color-primary hover:bg-color-bg-layout`,
                {
                    "text-color-primary bg-color-bg-layout": item?.activeUrls?.includes(activePath)
                },
            )}
        >
            {item?.icon}
        </Link>
        </Tooltip>
    )
}

export const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());
        // if (result) {
        //     redirect({
        //         to: '/login',
        //         throw: true,
        //       })
        // }
    }

    return (
        <>
            <div
                className={"w-20 min-h-screen h-full"}
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${themeColors.colorPrimary2} 1%, ${themeColors.colorPrimary})`,
                }}
            >

                <ul className={"flex flex-col gap-6 items-center h-full"}>
                    <li className={"mb-12 text-white"}>
                        <LeafIconLogo size={50} />
                    </li>
                    {sidebarItems?.map((item) => (
                        <li key={item?.key} className={"w-full pl-4"}>
                            <SidebarItem item={item} />
                        </li>
                    ))}
                    <li className={"mt-auto w-full pl-4 mb-2"}>
                    <Tooltip placement="right" title={"Logout"} color={themeColors.colorPrimary2}>
                        <Popconfirm
                            title="Logout?"
                            description="Are you sure you want to logout"
                            // icon={<LogOutIcon size={themeToken.sizeMD} className={"mr-2"} />}
                            onConfirm={handleLogout}
                            okButtonProps={{
                                danger: true,
                            }}
                            okText="Logout"
                            cancelText="Cancel"
                        >
                            <div className={"cursor-pointer flex justify-center p-2 text-white rounded-l-lg hover:text-color-primary hover:bg-color-bg-layout"}><LogOutIcon /></div>
                        </Popconfirm>
                        </Tooltip>
                    </li>
                </ul>
            </div>
            {/* <Menu defaultSelectedKeys={['1']} mode="inline" items={sidebarItems} /> */}
        </>
    );
}