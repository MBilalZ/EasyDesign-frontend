import {request} from "@/utils/index.js";
import apiRoutes from "@/constants/api.js";


export const subscribe = async (planId, signal) => {
    return (await request.post(apiRoutes.subscription.subscribe(planId), {}, {
        signal: signal, // Include the AbortSignal in the request options
    }));
};


export const cancelSubscription = async (signal) => {
    return (await request.post(apiRoutes.subscription.cancel, {}, {
        signal: signal, // Include the AbortSignal in the request options
    }))
}

