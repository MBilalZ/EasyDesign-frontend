const apiRoutes = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        emailCheck: "/auth/email/check",
        forgotPassword: "/auth/password/email",
        resetPassword: "/auth/password/reset",
    },
    user: {
        me: '/auth/user/me',
        updateProfile: '/auth/user/update',
        changePassword: '/auth/user/password/change',
    },
    general: {
        plans: '/plans',
        checkTokenValidity: '/auth/token/verify',
        verifyEmail: '/auth/email/verify',
    },
    subscription: {
        subscribe: (planId) => `/plan/update/${planId}`,
        cancel: '/subscription/cancel',
    },
};

export default apiRoutes;
