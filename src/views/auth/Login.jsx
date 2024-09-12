import Login from "@/components/views/auth/Login";
import {Helmet} from "react-helmet-async";

const LoginView = () => {
    return (
        <>
            <Helmet>
                <title>EasyDesign | Login</title>
            </Helmet>
            <Login/>
        </>
    )
}

export default LoginView;
