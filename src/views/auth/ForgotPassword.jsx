import ForgotPassword from "@/components/views/auth/ForgotPassword.jsx";
import {Helmet} from "react-helmet-async";

const ForgotPasswordView = () => {
    return (
        <>
            <Helmet>
                <title>EasyDesign | Forgot-Password</title>
            </Helmet>
            <ForgotPassword/>
        </>
    )
}

export default ForgotPasswordView;
