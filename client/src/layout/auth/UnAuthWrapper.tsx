import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import { redirect } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

function UnAuthWrapper({ children }: {children: ReactNode}) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log("isAuthenticated", isAuthenticated)
    if (isAuthenticated) {
        redirect({
            to: '/',
          })
    }
    return <>{children}</>;
}

export default UnAuthWrapper;