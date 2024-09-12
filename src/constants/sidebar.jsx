import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Roles from "@/utils/roles.js";
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';

const roles = {
    user: [Roles.user, Roles.admin],
    admin: [Roles.admin],
}
const sidebar = [
    {
        title: 'Dashboard',
        Icon: <DashboardOutlinedIcon/>,
        to: '/dashboard',
        hasSub: false,
        subMenu: [],
        requirePayment: true,

        headerTitle: 'Dashboard',
        roles: roles.user
    },
    {
        title: 'Connections',
        Icon: <CableOutlinedIcon/>,
        to: '/dashboard/connections',
        headerTitle: 'Connect Accounts',
        hasSub: false,
        subMenu: [],
        requirePayment: false,
        roles: roles.user
    },
    {
        title: 'Fonts',
        Icon: <FormatShapesIcon/>,
        to: '/dashboard/fonts',
        hasSub: false,
        requirePayment: false,
        headerTitle: 'Fonts',
        subMenu: [],
        roles: roles.user,
        pro: true,
    },
    {
        title: 'Settings',
        Icon: <SettingsOutlinedIcon/>,
        to: '/dashboard/settings',
        hasSub: true,
        roles: roles.user,
        requirePayment: true,
        subMenu: [
            {
                title: 'Profile',
                to: '/dashboard/settings/profile',
                roles: roles.user,
                requirePayment: true,
            },
            {
                title: 'Account',
                to: '/dashboard/settings/account',
                roles: roles.user,
                requirePayment: true,
            },
            {
                title: 'Notification',
                to: '/dashboard/settings/notification',
                roles: roles.user,
                requirePayment: true,
                pro: true,
            }
        ],
    },
    {
        title: 'Admin',
        Icon: <AdminPanelSettingsOutlinedIcon/>,
        to: '/dashboard/admin',
        hasSub: false,
        subMenu: [],
        roles: roles.admin,
        requirePayment: true,
    }
]

export default sidebar;