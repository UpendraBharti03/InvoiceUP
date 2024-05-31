import { TLoginFormZS } from "@/@types/auth";
import LoginForm from "@/components/login/LoginForm";
import { loginUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLoginSubmit = async (values: TLoginFormZS) => {
        const result = await dispatch(loginUser(values));
        console.log("result", result)
        if (result) {
            navigate({ to: "/dashboard" });
        }
    }
    return (
        <>
            <div className={"min-h-screen flex flex-col items-center justify-center bg-gray-100"}>
                <div className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
                    <div className={"flex items-center justify-center"}><span className={"text-lg font-semibold"}>InvoiceUp</span></div>
                    <div>
                        <LoginForm initialValues={{
                            email: '',
                            password: '',
                        }} handleSubmit={handleLoginSubmit} />
                    </div>
                    <div className={"text-center mt-4"}>
                        Don't have account? <Link to={"/signup"} className={"text-[#17413F] underline ml-1"}>Signup</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;