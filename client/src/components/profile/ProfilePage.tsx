import { selectUserDetails } from "@/redux/slices/authSlice";
import { theme } from "antd";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const {token: themeToken} = theme.useToken();
    const userDetails = useSelector(selectUserDetails);
    return (
        <div
            className={`flex flex-col items-center justify-center bg-gray-100`}
            style={{
                minHeight: `calc(100vh - ${themeToken?.padding}px)`,
            }}
        >
        <div className={"grid grid-cols-2 gap-2 bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"}>
            <div>Name:</div>
            <div>{userDetails?.name?.firstName} {userDetails?.name?.lastName}</div>
            <div>Email:</div>
            <div>{userDetails?.email}</div>
            <div>Name:</div>
            <div>Upendra</div>
        </div>
        </div>
    )
  }

  export default ProfilePage;