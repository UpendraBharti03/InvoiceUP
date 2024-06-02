import { selectUserDetails, updateUserProfile } from "@/redux/slices/authSlice";
import { theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserProfileForm from "@/components/profile/UserProfileForm";
import { TUserProfileFormZS } from "@/@types/profile";
import { AppDispatch } from "@/redux/store";
import { FormikHelpers } from "formik";

const ProfilePage = () => {
    const {token: themeToken} = theme.useToken();
    const dispatch = useDispatch<AppDispatch>()
    const userDetails = useSelector(selectUserDetails);

    const handleProfileFormSubmit = async (values: TUserProfileFormZS, formikHelpers?: FormikHelpers<TUserProfileFormZS>) => {
        const payload: Omit<TUserProfileFormZS, "email" | "isEditable"> = {
            name: {
                fullName: values?.name?.first + " " + values?.name?.last,
                first: values?.name?.first,
                last: values?.name?.last,
            },
        };
        const result = await dispatch(updateUserProfile(payload))
    }

    return (
        <div
            className={`flex flex-col items-center justify-center`}
            style={{
                minHeight: `calc(100vh - ${themeToken?.padding*2}px)`,
            }}
        >
        <div className={"relative bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
            <UserProfileForm
                initialValues={{
                    isEditable: false,
                    name: {
                        fullName: userDetails?.name?.fullName ?? "",
                        first: userDetails?.name?.first ?? "",
                        last: userDetails?.name?.last ?? "",
                    },
                    email: userDetails?.email ?? "",
                }}
                handleSubmit={handleProfileFormSubmit}
            />
        </div>
        </div>
    )
  }

  export default ProfilePage;