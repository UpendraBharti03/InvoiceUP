import { TSignupFormZS } from "@/@types/auth";
import { LeafIconLogo } from "@/assets/logos/LeafIconLogo";
import SignupForm from "@/components/signup/SignupForm";
import { signupUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { themeColors } from "@/theme";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

const SignupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleSignupSubmit = async (values: TSignupFormZS) => {
        const result = await dispatch(signupUser(values));
        if (result) {
            navigate({ to: "/dashboard" });
        }
    }
    return (
        <>
            <div className={`relative min-h-screen flex flex-col items-center justify-center`}
                style={{
                    backgroundImage: `linear-gradient(to bottom left, ${themeColors.colorPrimary2} 50%, ${themeColors.colorPrimary})`,
                }}
            >
                <div className={"text-white"}>
                    <LeafIconLogo />
                </div>
                <div className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
                    <div className={"flex items-center justify-center"}><span className={"text-lg font-semibold text-color-primary"}>InvoiceUP</span></div>
                    <div>
                        <SignupForm initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }} handleSubmit={handleSignupSubmit} />
                    </div>
                    <div className={"text-center mt-4"}>
                        Already have an account? <Link to={"/login"} className={"text-color-primary-2 underline font-bold ml-1"}>Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;