import {request} from "@/utils/index.js";
import apiRoutes from "@/constants/api.js";

export const getMe = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await request.get(apiRoutes.user.me);
        return response.data.user;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (data) => {

    return (await request.post(apiRoutes.user.updateProfile, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }))
};

export const changePassword = async (data) => {

    return (await request.post(apiRoutes.user.changePassword, data))
};