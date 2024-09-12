import React, {useEffect} from 'react';
import Div from "@/components/base/Div.jsx";
import {CircularProgress} from "@mui/material";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import {verifyEmailByUser} from "@/services/general/index.js";
import {useMutation} from "@tanstack/react-query";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const routerParams = useParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const userId = routerParams.userId;

    const {mutate: checkToken} = useMutation({
        mutationFn: verifyEmailByUser,
        onSuccess: (response) => {
            localStorage.setItem("verify-email", true);
            navigate(`/email-verify`);
        },
        onError: (error) => {
            toast.error("Invalid link provided or link has expired");
            navigate("/auth/login");
        }
    });

    useEffect(() => {
        if (!token && !userId) {
            // Redirect to login page
            toast.error("Invalid reset password link");
            navigate("/auth/login");
        } else {
            checkToken({token, user_id: userId});
        }
    }, [token, userId, checkToken, navigate]);

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

export default VerifyEmail;
