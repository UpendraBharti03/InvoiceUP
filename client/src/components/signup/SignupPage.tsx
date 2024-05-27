import { SignupFormZS, TSignupFormZS } from "@/@types/auth";
import SignupForm from "@/components/signup/SignupForm";
import { signupUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const SignupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleSignupSubmit = async (values: TSignupFormZS) => {
        const result = await dispatch(signupUser(values));
        console.log("result", result)
        if (result) {
            
        }
    }
    return (
        <>
            <div className={"min-h-screen flex flex-col items-center justify-center bg-gray-100"}>
                <div className={"flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
                    <div className={"flex items-center justify-center"}><span className={"text-lg font-semibold"}>InvoiceUp</span></div>
                    <div>
                        <SignupForm initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                        }} handleSubmit={handleSignupSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;