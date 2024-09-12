import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {useEffect} from "react";
import PageTransition from "@/components/base/PageTransition.jsx";

function AuthLayout() {
    const navigate = useNavigate();
    const location = useLocation()
    const {user, loading} = useAuth();
    useEffect(() => {
        if (!loading && user) {
            navigate(
                location?.state?.from || "/dashboard",
                {replace: true}
            );
        }
    }, [user, location, loading]);
    return (
        <PageTransition key={location.pathname}>
            <Outlet/>
        </PageTransition>
    );
}

export default AuthLayout;
