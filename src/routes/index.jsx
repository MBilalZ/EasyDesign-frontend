import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

// Layouts
import NonRequiredAuth from "@/layout/NonRequiredAuth";
import Dashboard from "@/layout/Dashboard.jsx";
import AuthLayout from "@/layout/AuthLayout";

// Utilities
import {roles} from "@/utils";

// Error Views
import PageNotFound from "@/views/errors/404";

// Lazy-loaded views
import Views from "@/views/import";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path={"/"} element={<NonRequiredAuth/>}>
                <Route path={""} element={<Navigate to={"/auth/login"}/>}/>
                <Route path={"terms-conditions"} element={<h1>Term & Conditions</h1>}/>
                <Route path={"reset-password"} element={<Views.ResetPassword/>}/>
                <Route path={"email-verify/:userId"} element={<Views.VerifyEmail/>}/>
                <Route path={"/email-verify"} element={<Views.EmailVerified/>}/>
                <Route path={"oauth/success"} element={<Views.OAuthSuccess/>}/>
                <Route path={"oauth/decline"} element={<Views.OAuthDecline/>}/>
            </Route>
            <Route path={"/auth"} element={<AuthLayout/>}>
                <Route path={""} element={<Navigate to={"/login"}/>}/>
                <Route path={"login"} element={<Views.Login/>}/>
                <Route path={"sign-up"} element={<Views.SignUpView/>}/>
                <Route path={"forgot-password"} element={<Views.ForgotPasswordView/>}/>
                <Route path={"set-password"} element={<Views.SetPassword/>}/>
            </Route>
            <Route path={"dashboard"} element={<Dashboard/>}>
                <Route
                    element={
                        <Views.ProtectedRoute
                            isLoginRequired={true}
                            roles={[roles.user, roles.admin]}
                        />
                    }
                >
                    <Route path="" index element={<Views.DashboardView/>}/>
                    <Route path="connections" element={<Views.Connections/>}/>
                    <Route path="my-account" element={<Views.MyAccount/>}/>
                    <Route path="fonts" element={<Views.FontList/>}/>
                </Route>
                
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
            <Route path={'unauthorized'} element={<Views.Unauthorized/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
};

export default RoutesApp;
