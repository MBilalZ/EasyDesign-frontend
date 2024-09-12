import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {Grid, Skeleton, Stack, Typography} from "@mui/material";
import {toast} from "react-hot-toast";
import {getAllPlans} from "@/services/general/index.js";
import {cancelSubscription} from "@/services/subscription/index.js";
import {useAuth} from "@/providers/AuthProvider.jsx";
import PlanCard from "./PlanCard";

const Plans = () => {
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {data: planData, isLoading} = useQuery({
        queryKey: ['plans'],
        queryFn: getAllPlans,
        refetchOnWindowFocus: false,
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        refetchOnMount: false,
    });

    const [currentPlanData, setCurrentPlanData] = useState(null);

    const {isPending: loading, mutate: cancelSubscribe} = useMutation({
        mutationKey: 'cancelSubscription',
        mutationFn: async () => {
            abortControllerRef.current = new AbortController();
            try {
                return await cancelSubscription(abortControllerRef.current.signal);
            } catch (error) {
                if (error.name === 'AbortError') {
                    // If the request was aborted, we don't want to proceed with any post-request logic.
                    return Promise.reject(error);
                }
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["me"], (oldData) => ({
                ...oldData,
                plan: {
                    planId: null,
                    status: null,
                    paymentStatus: null,
                },
            }));
            toast.success('Subscription cancelled successfully');
        },
        onError: (error) => {
            if (error.name === 'AbortError') {
                toast.error('Subscription request canceled');
            } else if (error.code === 'ERR_CANCELED') {
                toast.error(error.config?.signal?.reason || 'Request canceled');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        },
    });

    useEffect(() => {
        if (planData?.plans) {
            setCurrentPlanData(planData.plans.find(plan => Number(plan.id) === Number(user?.plan?.planId)) || {});
        }

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort('Navigation away from the page triggered request cancellation.') // Abort the request
            }
        }
    }, [planData, user]);

    return (
        <>
            <Typography variant="h1" fontSize="22px" fontWeight="600">Subscription</Typography>
            <Typography variant="body1" fontSize="14px" color="rgba(56, 56, 56, 0.8)" marginTop={1} marginBottom={2}>
                Get the process started in less than 05 minutes. Let<br/> us handle the rest.
            </Typography>
            <Grid container spacing={2}>
                {isLoading ? (
                    Array.from({length: 2}).map((_, index) => (
                        <Grid item xl={4} md={12} sm={6} xs={12} key={index}>
                            <Stack className="planCard">
                                <Skeleton variant="text" width={40} height={40}/>
                                <Skeleton variant="text" width={200} height={40}/>
                                <Skeleton variant="text" width={140} height={40}/>
                            </Stack>
                        </Grid>
                    ))
                ) : (
                    planData?.plans?.map((plan, index) => (
                        <Grid item xl={4} md={12} sm={6} xs={12} key={index}>
                            <PlanCard plan={plan} user={user} currentPlan={currentPlanData}
                                      cancel={{loading, cancelSubscribe}}/>
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default Plans;
