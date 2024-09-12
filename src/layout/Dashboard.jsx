import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import {ExpandLess, ExpandMore, Menu as MenuIcon} from '@mui/icons-material';
import {styled, useTheme} from '@mui/material/styles';
import {Link, NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import PageTransition from "@/components/base/PageTransition.jsx";
import {Stack} from "@mui/system";
import LiveNotification from "@/components/includes/LiveNotification.jsx";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import sidebar from "@/constants/sidebar.jsx";
import AddIcon from '@mui/icons-material/Add';
import MultiMarketPlace from "@/components/includes/MultiMarketPlace.jsx";
import ConnectionDialog from "@/components/includes/ConnectionDialog.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {useQueryClient} from "@tanstack/react-query";
import {Crisp} from "crisp-sdk-web";
import {useSelector} from "react-redux";
import {getMarketPlaces, selectSelectedMarketPlace} from "@/features/connections/connectionSlice.js";

const drawerWidth = 300;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),

    ...(theme.breakpoints.up('md') && {
        marginTop: theme.spacing(8),
        marginLeft: open ? 0 : `-${drawerWidth}px`,
    }),
    position: 'relative',
    zIndex: 1,
    ...(theme.breakpoints.down('md') && {
        marginTop: '60px',
        marginLeft: 0,
        zIndex: 0,
    }),
}));

const AppBarStyled = styled(AppBar, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: '100%',
    ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(theme.breakpoints.up('md') && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
    }),
    ...(theme.breakpoints.down('md') && {
        width: `100%`,
        marginLeft: `0px`,
    })
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end',
}));

const AppToolbar = styled(Toolbar)(({theme}) => ({
    paddingBlock: theme.spacing(1.5),
    justifyContent: 'space-between',
}));

// let currentUserRole = '2';

const DashboardLayout = () => {
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const {setIsLoggedIn, setUser, user, loading} = useAuth();
    const currentUserRole = String(user?.role);
    let paymentDone = user && user?.plan?.planId !== null && user?.plan?.paymentStatus === 'paid';
    const selectedMarketPlace = useSelector(selectSelectedMarketPlace);
    const marketPlaces = useSelector(getMarketPlaces);
    const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettingMenu = Boolean(anchorEl);
    const [open, setOpen] = useState(isWideScreen);
    const [openConnectionDialog, setOpenConnectionDialog] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(
        sidebar.filter(item => item.hasSub).reduce((acc, item) => {
            acc[item.title.replace(/\s+/g, '').toLowerCase()] = false;
            return acc;
        }, {})
    );

    // Function to get all paths that require payment (including submenus)
    const getRequiredPaymentPaths = (items) => {
        let paths = [];
        items.forEach(item => {
            if (item.requirePayment) {
                paths.push(item.to);
            }
            if (item.hasSub && item.subMenu.length > 0) {
                paths = paths.concat(getRequiredPaymentPaths(item.subMenu));
            }
        });
        return paths;
    };

    let requiredPaymentPaths = getRequiredPaymentPaths(sidebar);
    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth/login', {state: {from: location.pathname}});
        }
    }, [loading, navigate]);
    useEffect(() => {
        if (user) {

            // Configure Chat SDK
            Crisp.user.setNickname(
                user?.firstName + " " + user?.lastName
            );
            Crisp.user.setEmail(user?.email);
            Crisp.setTokenId(user?.id);
            if (user?.image) {
                Crisp.user.setAvatar(user?.image || '/images/icons/default-avatar.png');
            }
            if (user?.phoneNo) {
                Crisp.user.setPhone(user?.phoneNo || '');
            }
            Crisp.session.setData({
                plan: user?.plan.planId !== null ? user?.plan?.planId === '1' ? 'Monthly' : user?.plan?.planId === '2' ? 'Yearly' : 'Free' : 'Free',
                paymentStatus: user?.plan?.paymentStatus || 'No payment',
                paymentMessage: user?.plan?.paymentMessage || 'No payment message',
                role: user?.role === 1 ? 'Admin' : user?.role === 2 ? 'User' : 'Guest',
                userId: user?.id,
            });
            document.body.style.backgroundColor = '#FBFAFA';
            if (requiredPaymentPaths.includes(location.pathname) && !paymentDone) {
                navigate('/dashboard/my-account?tab=subscription');
            }

        }
    }, [user]);

    useEffect(() => {
        if (isWideScreen) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [isWideScreen]);

    useEffect(() => {
        const activeSubmenu = sidebar.find(item =>
            item.hasSub && item.subMenu.some(sub => sub.to === location.pathname)
        );
        if (activeSubmenu) {
            setSubmenuOpen(prevState => ({
                ...prevState,
                [activeSubmenu.title.replace(/\s+/g, '').toLowerCase()]: true
            }));
        }

        // Close drawer on mobile screen after route change
        if (isMobileScreen) {
            setOpen(false);
        }

        // If current role is not allowed to access the current route, redirect to dashboard
        // if (!sidebar.some(item => item.to === location.pathname && item.roles.includes(currentUserRole))) {
        //     navigate('/dashboard');
        // }
    }, [location.pathname, isMobileScreen]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSubmenuClick = (menu) => {
        setSubmenuOpen(prevState => ({
            ...prevState,
            [menu.replace(/\s+/g, '').toLowerCase()]: !prevState[menu.replace(/\s+/g, '').toLowerCase()]
        }));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        handleProfileClose();
        setIsLoggedIn(false);
        setUser(null);
        queryClient.clear();
        navigate('/auth/login');
    }

    const renderSubMenu = (subMenu, parentPath) => {
        return (
            <Collapse in={submenuOpen[parentPath.replace(/\s+/g, '').toLowerCase()]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subMenu.map((item) => {
                        if (!item.roles.includes(currentUserRole)) return null;
                        return (
                            <ListItem
                                button
                                component={NavLink}
                                to={item.requirePayment ? paymentDone === true ? item.to : '/dashboard/my-account' : item.to}
                                selected={location.pathname === item.to}
                                sx={{pl: 4, mb: 0.8}}
                                key={item.to}
                            >
                                <ListItemText primary={item.title}/>
                                {item.pro && <Chip label="Pro" color="primary" size="small" className="has-pro"/>}
                            </ListItem>
                        )
                    })}
                </List>
            </Collapse>
        )
    };

    return (
        <Box sx={{display: 'flex'}} className={'dashboard'}>
            <AppBarStyled color={
                theme.palette.mode === 'dark' ? 'inherit' : 'white'
            } position="fixed" open={open}>
                <AppToolbar className={`dashboard__toolBar ${isMobileScreen && 'mobile-view'}`}>
                    <Stack direction={'row'}>
                        {!isWideScreen && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    mr: {
                                        xs: 0.5,
                                        sm: 2,
                                    }, ...(open && {display: 'none'})
                                }}
                            >
                                <MenuIcon/>
                            </IconButton>
                        )}
                        <div>
                            <Typography variant="h6" noWrap component="div" fontSize={isMobileScreen ? 20 : 24}
                                        fontWeight={600}>
                                {sidebar.find(item => item.to === location.pathname)?.headerTitle || 'Dashboard'}
                            </Typography>
                            {selectedMarketPlace?.shopName && <Typography variant={'body2'} component={'span'} color={
                                theme.palette.mode === 'dark' ? '#FFFFFF99' : '#2020208F'
                            } fontWeight={500}>
                                Store: <strong>{selectedMarketPlace?.shopName}</strong>
                            </Typography>}

                        </div>
                    </Stack>
                    <div>
                        <Stack direction={'row'}>
                            {
                                !isMobileScreen && <LiveNotification theme={theme}/>
                            }
                            <Stack>
                                <Tooltip title={user?.name} arrow>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{
                                            ml: {
                                                xs: 0.5,
                                                sm: 2,
                                            }, gap: {
                                                xs: 0.5,
                                                sm: 1,
                                            },
                                        }}
                                        aria-controls={openSettingMenu ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openSettingMenu ? 'true' : undefined}
                                        disableRipple
                                    >
                                        <Avatar alt={user?.firstName}
                                                src={user?.image || '/images/icons/default-avatar.png'}
                                                sx={{width: 32, height: 32}}/>
                                        <div style={{textAlign: 'left'}}>
                                            <Typography variant={'body2'} component={'p'} color={
                                                theme.palette.mode === 'dark' ? '#FFFFFF99' : '#2020208F'
                                            }
                                                        fontWeight={'500'} noWrap>
                                                Hello,
                                            </Typography>
                                            <Typography variant={'body2'} component={'div'} noWrap color={
                                                theme.palette.mode === 'dark' ? '#FFFFFF' : '#202020'
                                            } sx={{
                                                maxWidth: 100,
                                            }}
                                                        fontWeight={600}>
                                                {user?.firstName || 'User'}
                                            </Typography>
                                        </div>
                                        {openSettingMenu ? <ExpandLess/> : <ExpandMore/>}
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={openSettingMenu}
                                onClose={handleProfileClose}
                                onClick={handleProfileClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem onClick={handleProfileClose}>
                                    <Avatar/> Profile
                                </MenuItem>
                                <MenuItem onClick={
                                    () => {
                                        handleProfileClose()
                                        setTimeout(() => {
                                            if (!paymentDone) {
                                                navigate('/dashboard/my-account?tab=subscription')
                                            } else {
                                                navigate('/dashboard/my-account?tab=contact')
                                            }
                                        }, 100)
                                    }
                                }>
                                    <Avatar/> My account
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={handleProfileClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small"/>
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleProfileClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small"/>
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Stack>
                    </div>
                </AppToolbar>
            </AppBarStyled>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: '#202020',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100%',
                        zIndex: 2,
                        paddingInline: theme.spacing(2),
                    },
                }}
                variant={isWideScreen ? "persistent" : "temporary"}
                anchor="left"
                open={open}
                onClose={!isWideScreen ? handleDrawerClose : undefined}
                className={'dashboard__drawer'}
            >
                <DrawerHeader className={'dashboard__drawer--header'}>
                    <div className={'dashboard__drawer--header-logo'}>
                        <Link to="/dashboard" className={'app-logo'}>
                            <img src="/images/logo.svg" alt="logo"/>
                            <div className={"authContainer__left--logoText"}>
                                <Typography
                                    variant={"body1"}
                                    fontSize={22.32}
                                    fontWeight={"800"}
                                    lineHeight={1}
                                    color={"white"}
                                    textAlign={"left"}
                                >
                                    Easy
                                </Typography>
                                <Typography
                                    variant={"body2"}
                                    fontSize={22.32}
                                    fontWeight={"300"}
                                    lineHeight={1}
                                    color={"white"}
                                >
                                    Design
                                </Typography>
                            </div>

                        </Link>

                    </div>
                </DrawerHeader>
                <div className={'dashboard__drawer--connection'}>
                    {
                        marketPlaces.length <= 0 ? (<>
                            <div className={'dashboard__drawer--connection-notConnected'}>
                                <Typography variant="h6" component="h6" fontSize={16} marginBottom={6}>
                                    Let's start!
                                </Typography>
                                <Typography variant="body2" component="p" fontSize={12} marginBottom={6}
                                            color={'#2422208F'}>
                                    Creating or adding new tasks couldn't be easier
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{width: '100%', marginTop: 2}}
                                    startIcon={<AddIcon/>}
                                    onClick={() => setOpenConnectionDialog(true)}
                                >
                                    Create new store
                                </Button>
                            </div>
                        </>) : <MultiMarketPlace setOpenConnectionDialog={setOpenConnectionDialog}/>
                    }

                </div>
                <List>
                    <Typography
                        variant="h6"
                        component="h6"
                        fontSize={14}
                        marginBottom={1}
                        color={'#FFFFFF99'}
                        marginLeft={4}
                    >
                        MENU
                    </Typography>

                    {sidebar.map((item) => {
                        if (!item.roles.includes(currentUserRole)) return null;
                        return (
                            <React.Fragment key={item.title}>
                                <ListItem
                                    button
                                    className={
                                        `${item.hasSub ? `has-sub-menu ${submenuOpen[item.title.replace(/\s+/g, '').toLowerCase()] ? 'open' : ''}` : ''} ${item.requirePayment && !paymentDone ? 'disabled' : ''}`
                                    }
                                    onClick={item.hasSub ? () => handleSubmenuClick(item.title) : null}
                                    component={item.hasSub ? 'div' : NavLink}
                                    to={item.requirePayment ? paymentDone === true ? item.hasSub ? null : item.to : '/dashboard/my-account?tab=subscription' : item.to}
                                    selected={location.pathname === item.to}
                                    sx={{mb: 1}}
                                >
                                    <ListItemIcon>{item.Icon}</ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                    {item.pro && <Chip label="Pro" color="primary" size="small" className="has-pro"/>}
                                    {item.hasSub && (submenuOpen[item.title.replace(/\s+/g, '').toLowerCase()] ?
                                        <ExpandLess/> : <ExpandMore/>)}
                                </ListItem>
                                {item.hasSub && renderSubMenu(item.subMenu, item.title)}
                            </React.Fragment>
                        );
                    })}
                </List>
            </Drawer>
            <Main open={open}>

                <PageTransition key={location.pathname}>
                    <Outlet/>
                </PageTransition>
            </Main>

            <ConnectionDialog openDialog={openConnectionDialog} setOpenDialog={setOpenConnectionDialog}/>
        </Box>
    );
};

export default DashboardLayout;
