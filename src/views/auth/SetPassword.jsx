import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SetPasswordView from "@/components/views/auth/SetPassword.jsx";

const SetPassword = () => {
    const [token] = useState(localStorage.getItem("resetPasswordToken"));
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            // Redirect to login page
            navigate("/auth/login")
        }
    }, []);
    return (
        <SetPasswordView token={token}/>
    );
};

export default SetPassword;