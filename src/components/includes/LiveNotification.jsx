import {Box, Divider, IconButton, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Stack} from "@mui/system";
import {Circle} from "@mui/icons-material";

let ITEM_HEIGHT = 80;

const notificationData = [
    {
        title: 'You have a new message from John Doe in the chat',
        time: '5 minutes ago',
        isRead: false
    },
    {
        title: 'You just received a new order with the order number #2456',
        time: '10 minutes ago',
        isRead: true
    }
    // Add more notifications as needed
];

const LiveNotification = ({theme}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettingMenu = Boolean(anchorEl);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    useEffect(() => {
        // Check if there are any unread notifications
        setHasUnreadNotifications(notificationData.some(notification => !notification.isRead));
    }, []);

    const handleCloseNotification = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label={hasUnreadNotifications ? "You have new notifications" : "No new Notifications"}
                color="inherit"
                className={`notification-icon ${hasUnreadNotifications ? 'shake' : ''}`}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                disableRipple
            >
                <img
                    src="/images/icons/notification.svg"
                    alt="notification"
                    style={{
                        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
                    }}
                />
                {hasUnreadNotifications && <span className="notification-pointer"></span>}
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openSettingMenu}
                onClose={handleCloseNotification}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: 300,
                        maxHeight: ITEM_HEIGHT * 4.5,
                        overflow: 'hidden',
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
                {/* Scrollable content area with paddingBottom */}
                <Box sx={{flex: 1, overflowY: 'auto', maxHeight: ITEM_HEIGHT * 4, paddingBottom: 2}}>
                    {notificationData.map((notification, index) => (
                        <React.Fragment key={index}>
                            <MenuItem disabled={notification.isRead} disableRipple>
                                <Stack direction="row" spacing={1}>
                                    {notification.isRead ? (
                                        <Circle fontSize={'inherit'}/>
                                    ) : (
                                        <Circle fontSize={'inherit'} sx={{color: 'success.main'}}/>
                                    )}
                                    <div>
                                        <Typography variant="subtitle1" fontSize={12}
                                                    sx={{fontWeight: 600, textWrap: 'wrap', lineHeight: 1.2}}>
                                            {notification.title}
                                        </Typography>
                                        <Typography variant="body2" fontSize={10} marginTop={1}
                                                    sx={{color: 'text.secondary'}}>
                                            {notification.time}
                                        </Typography>
                                    </div>
                                </Stack>
                            </MenuItem>
                            {index < notificationData.length - 1 && <Divider sx={{marginLeft: 1, marginRight: 1}}/>}
                        </React.Fragment>
                    ))}
                </Box>

                {/* Fixed Footer */}
                <Box
                    onClick={handleCloseNotification}
                    sx={{
                        borderTop: '1px solid #ddd',
                        backgroundColor: 'background.paper',
                        paddingY: 1,
                        paddingX: 2,
                        position: 'sticky',
                        bottom: 0,
                        width: '100%',
                        cursor: 'pointer', // Makes it clear that the footer is clickable
                        '&:hover': {
                            backgroundColor: 'action.hover', // Change background on hover
                        }
                    }}
                >
                    <Typography variant="subtitle1" fontSize={12} sx={{fontWeight: 600, textAlign: 'center'}}>
                        Mark all as read
                    </Typography>
                </Box>

            </Menu>
        </>
    );
};

export default LiveNotification;
