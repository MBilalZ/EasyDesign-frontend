// AuthProvider.js
import {createContext, useContext, useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getMe} from "@/services/user/index.js";
import {loginRequest, logout as handleLogoutRequest} from "@/services/auth/index.js";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {Crisp} from "crisp-sdk-web";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [moduleAccess, setModuleAccess] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requiredUser, setRequiredUser] = useState(false);
    const queryClient = useQueryClient();
    const {data: userData, isError: getUserError} = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        enabled: isLoggedIn && requiredUser,
        retryDelay: 5000,
        // maximum retry attempts
        retry: 3,
    });

    const {mutate: handleLogin, status} = useMutation({
        mutationFn: (user) => loginRequest(user),
        onSuccess: (data) => {
            setIsLoggedIn(true);
            setUser({...data.user});
            setRequiredUser(false);
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['me'], {...data.user});
            // Determine the redirect path based on the user's subscription status
            const subscriptionRedirect = '/dashboard/my-account?tab=subscription';
            const defaultRedirect = '/dashboard';

            // Check if there is a previous location to redirect to
            const redirectPath = location.state?.from
                ? location.state.from
                : (user?.plan?.planId === null && user?.plan?.paymentStatus !== 'paid')
                    ? subscriptionRedirect
                    : defaultRedirect;
            navigate(redirectPath);
            toast.success('Logged in successfully');
        },
        onError: (error) => {
            setLoading(false);
            if (error?.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    });

    const {mutate: handleLogout} = useMutation({
        mutationFn: handleLogoutRequest,
        enabled: false,
        onSuccess: () => {
            setIsLoggedIn(false);
            setModuleAccess({});
            setUser(null);
            Crisp.setTokenId(); // 1. Clear the token value
            Crisp.session.reset(); // 2. Unbind the current session
            localStorage.removeItem('token');
            queryClient.clear();
        },
        onError: () => {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (userData) {
            setUser({...userData});
            setLoading(false);
        }
        if (getUserError) {
            setLoading(false);
            queryClient.clear();
        }
    }, [userData, getUserError, queryClient]);


    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuthStatus();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuthStatus = () => {
        setIsLoggedIn(true);
        setRequiredUser(true);
    };

    const login = async (user) => {
        await handleLogin(user);
    };

    const logout = async () => {
        await handleLogout();
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                moduleAccess,
                login: {login, status},
                logout,
                user,
                loading,
                setUser,
                setRequiredUser,
                setIsLoggedIn
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
