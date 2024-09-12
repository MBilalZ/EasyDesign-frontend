import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useCallback, useEffect, useRef} from "react";
import {Button, Divider, Skeleton, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {toast} from "react-hot-toast";
import {subscribe} from "@/services/subscription/index.js";

const PlanCard = ({plan, currentPlan, user, cancel}) => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const abortControllerRef = useRef(null);

    const {mutate: handleSubscribe, isPending} = useMutation({
        mutationKey: 'subscribe',
        mutationFn: async (planId) => {
            abortControllerRef.current = new AbortController();
            try {
                return await subscribe(planId, abortControllerRef.current.signal);
            } catch (error) {
                if (error.name === 'AbortError') {
                    // If the request was aborted, we don't want to proceed with any post-request logic.
                    return Promise.reject(error);
                }
                throw error;
            }
        },
        onSuccess: async () => {
            try {
                await queryClient.invalidateQueries({queryKey: ['me'], exact: true});
                toast.success('Subscribed successfully');
            } catch (e) {
                if (e.name !== 'AbortError') {
                    toast.error('An error occurred');
                }
            }
        },
        onError: (error) => {
            console.log(error);
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
        // Cleanup function to cancel the request when the component unmounts or route changes
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort('Navigation away from the page triggered request cancellation.') // Abort the request
            }
        };
    }, [location]);

    const renderActionButton = useCallback(() => {
        const userPlanId = Number(user?.plan?.planId);
        if (userPlanId === plan.id) {
            return (
                <>
                    <Button variant="contained" color="primary" size="inlined" disabled={cancel.loading} disableRipple>
                        Subscribed
                    </Button>
                    <div>
                        {cancel.loading ? (
                            <Skeleton variant="text" width={100} height={20}/>
                        ) : (
                            <a className="cancel-subscription" href="#" onClick={cancel.cancelSubscribe}>
                                Cancel subscription
                            </a>
                        )}
                    </div>
                </>
            );
        }

        const isUpgrade = user.plan.planId && Number(currentPlan?.price) < Number(plan.price);
        const isDowngrade = user.plan.planId && Number(currentPlan?.price) > Number(plan.price);
        const buttonText = isUpgrade ? 'Upgrade Package' : isDowngrade ? 'Downgrade Package' : 'Subscribe';

        return (
            <Button variant="outlined" color="primary" size="inlined" disabled={isPending || cancel.loading}
                    onClick={() => handleSubscribe(plan.id)}>
                {buttonText}
            </Button>
        );
    }, [user.plan.planId, plan.id, currentPlan?.price, isPending, cancel]);

    return (
        <div className="planCard">
            <div className="planCard__header">
                <Typography variant="body1" color="primary" fontSize={16}>Business</Typography>
                <Typography component="b" fontSize="18px" fontWeight="600">$</Typography>
                <Typography component="b" fontSize="40px" fontWeight="600">{plan.price}</Typography>
                <Typography component="span" fontSize="16px" fontWeight="400" sx={{opacity: 0.5}}
                            color="rgba(4, 37, 82, 1)">
                    / {plan.billingMethod}
                </Typography>
                <Typography variant="body1" fontSize="14px" color="rgba(32, 32, 32, 1)" marginTop={0.5}>
                    {plan.description}
                </Typography>
                <Divider sx={{my: 2, opacity: 0.6}}/>
            </div>
            <div className="planCard__features">
                <ul>
                    {JSON.parse(plan?.featuresList || '[]').map((feature, index) => (
                        <li key={index}>
                            <Typography variant="body1" fontSize="14px" color="rgba(32, 32, 32, 1)" marginTop={0.5}>
                                {feature.title}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="planCard__actions">
                {renderActionButton()}
            </div>
        </div>
    );
};

export default PlanCard;
