import { TAuthSliceState } from "@/@types/auth";
import { redirect } from "@tanstack/react-router";

export const authenticate = ({auth, isAuthenticatedRoute}: {auth: TAuthSliceState; isAuthenticatedRoute: boolean}) => {
    const isAuthenticated = auth?.isAuthenticated;
    if (isAuthenticatedRoute) {
        if (!isAuthenticated) {
            redirect({
                to: '/login',
                throw: true,
              })
        }
    } else {
        if (isAuthenticated) {
            redirect({
                to: '/dashboard',
                throw: true,
              })
        }
    }

}