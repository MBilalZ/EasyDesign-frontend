import React from 'react';
import {Helmet} from "react-helmet-async";
import MyAccountView from "@/components/views/dashboard/my-account/index.jsx";

const MyAccount = () => {
    return (
        <>
            <Helmet>
                <title>Easy Design | Account</title>
            </Helmet>
            <MyAccountView/>
        </>
    );
};

export default MyAccount;