import {request} from "@/utils/index.js";
import apiRoutes from "@/constants/api.js";

export const getAllPlans = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await request.get(apiRoutes.general.plans);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkTokenValidity = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await request.post(apiRoutes.general.checkTokenValidity, {token});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verifyEmailByUser = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await request.post(apiRoutes.general.verifyEmail, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}