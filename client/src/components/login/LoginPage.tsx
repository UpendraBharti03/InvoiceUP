import { TLoginFormZS } from "@/@types/auth";
import LoginForm from "@/components/login/LoginForm";
import { loginUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { themeColors } from "@/theme";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { cn } from "@ant-ui";
import { LeafIconLogo } from "@/assets/logos/LeafIconLogo";
const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLoginSubmit = async (values: TLoginFormZS) => {
        const result = await dispatch(loginUser(values));
        if (result) {
            navigate({ to: "/dashboard" });
        }
    }
    return (
        <>
            <div className={cn(`relative min-h-screen flex flex-col items-center justify-center`)}
                style={{
                    backgroundImage: `linear-gradient(to bottom left, ${themeColors.colorPrimary2} 50%, ${themeColors.colorPrimary})`,
                }}
            >
                <div className={"text-white"}>
                    <LeafIconLogo />
                </div>
                <div className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-2xl w-full max-w-md"}>
                    <div className={"flex items-center justify-center mb-2"}><span className={"text-lg font-semibold text-color-primary"}>InvoiceUP</span></div>
                    <div>
                        <LoginForm initialValues={{
                            email: '',
                            password: '',
                        }} handleSubmit={handleLoginSubmit} />
                    </div>
                    <div className={"text-center mt-4"}>
                        Don't have account? <Link to={"/signup"} className={"text-color-primary-2 underline ml-1 font-bold"}>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;