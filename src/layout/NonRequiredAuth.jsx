import {Outlet} from "react-router-dom";
import {useAuth} from "@/providers/AuthProvider";

function NonRequiredAuth() {
    const {user} = useAuth();
    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default NonRequiredAuth;
