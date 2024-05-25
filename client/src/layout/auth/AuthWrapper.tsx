import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { redirect } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import CustomLayout from "@/layout/Layout";

function AuthWrapper({ children }: {children: ReactNode}) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    if (!isAuthenticated) {
        redirect({
            to: '/login',
            throw: true,
          })
    }
    return <CustomLayout>{children}</CustomLayout>;
}

export default AuthWrapper;