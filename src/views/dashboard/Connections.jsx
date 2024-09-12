import React from 'react';
import ConnectionsView from "@/components/views/dashboard/connections/index.jsx";
import {Helmet} from "react-helmet-async";

const Connections = () => {
    return (
        <>
            <Helmet>
                <title>Easy Design | Connections</title>
            </Helmet>
            <ConnectionsView/>
        </>
    );
};

export default Connections;