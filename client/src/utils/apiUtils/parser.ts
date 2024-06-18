import { toast } from 'react-toastify';

export const extractDataFromResponse = ({
    response,
    successCode = 200,
    successStatus = true,
    showSuccessToast = true,
    showErrorToast = true
}: {
    response: any,
    successCode?: number,
    successStatus?: boolean,
    showSuccessToast?: boolean,
    showErrorToast?: boolean
}) => {
    const data = response?.data?.data ?? {};
    if (response.status === successCode && response.data.success === successStatus && response.data.code === successCode) {
        if (showSuccessToast && response?.data?.message) {
            toast.success(response.data.message);
        }
        data.error = false;
        return data;
    }
    if (showErrorToast) {
        toast.error(response.data.message);
    }
    data.error = true;
    return data;
};

export const parseApiErrorResponse = ({ error, showToast = true }: { error: any, showToast?: boolean }) => {
    if (error.response) {
        const response = error.response;
        const data = response?.data?.data ?? {};
        data.error = true;
        if (showToast) {
            toast.error(response.data.message);
        }
        return data;
    }
    if (showToast) {
        toast.error('Something went wrong, Please try again later.');
    }
    return { error: true };
};