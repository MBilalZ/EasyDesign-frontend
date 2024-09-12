// views/import.js

import React from "react";

// Auth Views
const Login = React.lazy(() => import("@/views/auth/Login.jsx"));
const ForgotPasswordView = React.lazy(() => import("@/views/auth/ForgotPassword.jsx"));
const SignUpView = React.lazy(() => import("@/views/auth/SignUp.jsx"));
const ResetPassword = React.lazy(() => import("@/views/auth/ResetPassword.jsx"));
const SetPassword = React.lazy(() => import("@/views/auth/SetPassword.jsx"));
const VerifyEmail = React.lazy(() => import("@/views/auth/VerifyEmail.jsx"));
const EmailVerified = React.lazy(() => import("@/views/auth/EmailVerified.jsx"));

// Public Views
const FormView = React.lazy(() => import("@/views/public/Form"));

// Dashboard Views
const DashboardView = React.lazy(() => import("@/views/dashboard"));
const Connections = React.lazy(() => import("@/views/dashboard/Connections"));
const MyAccount = React.lazy(() => import("@/views/dashboard/MyAccount"));
const FontList = React.lazy(() => import("@/views/dashboard/FontList"));
// Others
const ProtectedRoute = React.lazy(() => import("@/routes/ProtectedRoute.jsx"));


//  OAuth Views
const OAuthSuccess = React.lazy(() => import("@/views/oauth/success"));
const OAuthDecline = React.lazy(() => import("@/views/oauth/decline"));


// Error
// const PageNotFound = React.lazy(() => import("@/views/errors/404"));
const Unauthorized = React.lazy(() => import("@/views/errors/403"));

const Views = {
    // Auth Views
    Login,
    ForgotPasswordView,
    SignUpView,
    ResetPassword,
    SetPassword,
    VerifyEmail,
    EmailVerified,
    // Public Views
    FormView,
    // Dashboard Views
    DashboardView,
    Connections,
    MyAccount,
    FontList,
    // Others
    ProtectedRoute,
    // OAuth Views
    OAuthSuccess,
    OAuthDecline,
    // Error
    Unauthorized
};

export default Views;
