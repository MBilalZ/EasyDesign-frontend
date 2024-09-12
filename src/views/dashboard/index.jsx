import DashboardView from "@/components/views/dashboard/DashboardView.jsx";
import {Helmet} from "react-helmet-async";

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Easy Design | Dashboard</title>
            </Helmet>
            <DashboardView/>
        </>
    )
}

export default Dashboard;
