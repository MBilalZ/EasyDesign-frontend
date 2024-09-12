import React, {useEffect} from 'react';
import Div from "@/components/base/Div.jsx";
import {CircularProgress} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {checkTokenValidity} from "@/services/general/index.js";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const checkToken = async (token) => {
        try {
            const response = await checkTokenValidity(token);
            localStorage.setItem("resetPasswordToken", token);
            navigate(`/auth/set-password`);
        } catch (e) {
            toast.error("Invalid reset password link provided or link has expired");
            navigate("/auth/login")
        }
    }
    useEffect(() => {
        if (!token) {
            // Redirect to login page
            toast.error("Invalid reset password link");
            navigate("/auth/login")

        } else {
            checkToken(token);
        }
    }, [token]);
    return (
        <Div sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            bg: "background"
        }}>
            <CircularProgress/>
        </Div>
    );
};

export default ResetPassword;