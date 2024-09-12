import React, {useCallback, useMemo, useState} from 'react';
import BaseNotificationBar from "@/components/base/BaseNotificationBar.jsx";
import {Stack} from "@mui/system";
import {Chip, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import Div from "@/components/base/Div.jsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {motion} from "framer-motion";
import LinkOffIcon from '@mui/icons-material/LinkOff';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {handleAccountDisconnect, handleConnection} from "@/services/connections/index.js";

const SignUpText = ({link}) => {
    return (
        <Typography variant={'body2'} component={'div'}
                    fontWeight={400} color={'#202020CC'} fontSize={12}>
            Don’t have account? <Typography variant={'body2'} component={'a'}
                                            href={link}
                                            fontSize={12}
                                            fontWeight={500}
                                            color={'primary'}>Sign Up</Typography>
        </Typography>
    )
};

const ConnectionsView = () => {
    const {connectionsList} = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedConnection, setSelectedConnection] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const open = Boolean(anchorEl);

    const handleClick = useCallback((event, connection) => {
        setAnchorEl(event.currentTarget);
        setSelectedConnection(connection);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setSelectedConnection(null);
    }, []);

    const handleViewStore = useCallback(() => {
        console.log('View Store', selectedConnection);
        handleClose();
    }, [selectedConnection, handleClose]);

    const handleDisconnect = useCallback(() => {
        handleAccountDisconnect(selectedConnection);
        handleClose();
    }, [selectedConnection, handleClose]);

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const groupedConnections = useMemo(() => {
        const filteredConnections = connectionsList.connections.filter(connection =>
            connection.shopName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filteredConnections.reduce((acc, connection) => {
            // First group by accountType (marketplace, printProvider)
            acc[connection.accountType] = acc[connection.accountType] || {};

            // Then group by type (Amazon, Etsy, etc.)
            acc[connection.accountType][connection.type] = acc[connection.accountType][connection.type] || [];
            acc[connection.accountType][connection.type].push(connection);

            return acc;
        }, {});
    }, [searchTerm]);

    const renderConnection = useCallback((connection, index) => (
        <Grid item xs={12} lg={6} xl={4} key={index}>
            <Stack direction={'row'} gap={1} justifyContent={'space-between'} alignItems={'center'}
                   sx={{background: '#F1F1F1', padding: '14px 20px', borderRadius: 1}}>
                <Stack direction={'row'} gap={1.2}>
                    <div className={'icons-list'}>
                        <img src={connection.logo} alt={connection.name} className={'responsive-image'}/>
                    </div>
                    <div>
                        <Typography variant={'body2'} component={'p'} fontSize={16}
                                    fontWeight={'500'} color={'#202020'}>
                            {connection.name}
                        </Typography>
                        <SignUpText link={connection?.signUpLink}/>
                    </div>
                </Stack>
                <Button variant={'contained'} color={'primary'} size={'extra-small'}
                        onClick={() => handleConnection(connection.name.toLowerCase())}>
                    Connect
                </Button>
            </Stack>
        </Grid>
    ), []);

    const hasConnections = Object.keys(groupedConnections).length > 0;

    return (
        <>
            <BaseNotificationBar allowMargin={true}>
                <Stack direction={{md: 'row', xs: 'column-reverse'}} justifyContent={'space-between'} columnGap={1}
                       sx={{width: '100%'}}>
                    <div>
                        <Typography variant={'body2'} fontSize={24} color={'#fff'} fontWeight={600}>
                            Your Store
                        </Typography>
                        <Typography variant={'body2'} fontSize={14} color={'#fff'} fontWeight={400}>
                            Lorem ipsum dolor sit amet consectetur. Dolor est nec pharetra quam malesuada maecenas.
                        </Typography>
                        <Stack direction={'row'} gap={1} sx={{mt: 2}}>
                            <div style={{width: 23}}>
                                <img src={'/images/icons/amazon-square.png'} alt={'store'}
                                     className={'responsive-image'}/>
                            </div>
                            <div style={{width: 23}}>
                                <img src={'/images/icons/etsy-square.png'} alt={'store'}
                                     className={'responsive-image'}/>
                            </div>
                            <div style={{width: 23}}>
                                <img src={'/images/icons/shopify-square.png'} alt={'store'}
                                     className={'responsive-image'}/>
                            </div>
                        </Stack>
                    </div>
                    <div>
                        <TextField
                            name={'storeName'}
                            placeholder={'Store Name'}
                            variant={'outlined'}
                            fullWidth
                            size={'small'}
                            sx={{
                                mb: 1,
                                '& input': {color: '#FFFFFF99 !important'},
                                borderColor: '#2C2C2C',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#2C2C2C',
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <SearchIcon style={{color: '#FFFFFF99'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleSearchChange}
                        />
                    </div>
                </Stack>
            </BaseNotificationBar>

            {
                !searchTerm && (
                    <Div sx={{marginTop: 5, background: 'transparent'}}>
                        <Typography variant={'h6'} fontSize={20} fontWeight={600}>Marketplace</Typography>
                        <Grid container columnSpacing={5} rowGap={{lg: 0, xs: 2}} mt={3}>
                            {connectionsList.marketPlaces.map(renderConnection)}
                        </Grid>
                        <Typography variant={'h6'} fontSize={20} fontWeight={600} mt={4}>Print Providers</Typography>
                        <Grid container columnSpacing={5} rowGap={{lg: 0, xs: 2}} mt={3}>
                            {connectionsList?.printProviders?.map(renderConnection)}
                        </Grid>
                    </Div>
                )
            }

            <Div sx={{marginTop: 5, background: 'transparent'}}>
                {hasConnections ? (
                    <div>
                        {/* Render Marketplaces */}
                        {groupedConnections['marketplace'] && (
                            <>
                                <Typography variant={'h6'} color={'#0D062D'} fontSize={16} fontWeight={600}
                                            gutterBottom>
                                    Marketplaces
                                </Typography>
                                <Grid container columnSpacing={5} rowGap={{lg: 0, xs: 2}}>
                                    {Object.keys(groupedConnections['marketplace']).map((type) => (
                                        <Grid item lg={3} md={6} xs={12} key={type}>
                                            <motion.div
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <div className={'connectedAccounts'}>
                                                    <div className={'connectedAccounts__header'}
                                                         style={{'--color': groupedConnections['marketplace'][type][0].color}}>
                                        <span className={'connectedAccounts__header--dot'}
                                              style={{'--color': groupedConnections['marketplace'][type][0].color}}></span>
                                                        <Typography variant={'h6'} color={'#0D062D'} fontSize={14}
                                                                    fontWeight={500}>
                                                            {type}
                                                        </Typography>
                                                    </div>
                                                    <div className={'connectedAccounts__content'}>
                                                        <Grid container spacing={2}>
                                                            {groupedConnections['marketplace'][type].map((connection) => (
                                                                <Grid item xs={12}
                                                                      key={connection.shopId}>
                                                                    <motion.div
                                                                        initial={{opacity: 0, y: 20}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{duration: 0.3}}
                                                                    >
                                                                        <div
                                                                            className={'connectedAccounts__content--list'}>
                                                                            <IconButton
                                                                                className={'connectedAccounts__content--list-floating'}
                                                                                onClick={(event) => handleClick(event, connection)}>
                                                                                <MoreHorizIcon/>
                                                                            </IconButton>
                                                                            <Chip
                                                                                label={connection.status === 'connected' ? 'Connected' : connection.status === 'inactive' ? 'Inactive' : 'Expired'}
                                                                                color={connection.status === 'connected' ? 'primary' : connection.status === 'inactive' ? 'default' : 'error'}
                                                                                size={'small'}
                                                                                className={'label-chip no-round'}/>
                                                                            <Typography variant={'body2'}
                                                                                        color={'#202020'} fontSize={14}
                                                                                        noWrap
                                                                                        fontWeight={500}
                                                                                        marginTop={'10px'}>
                                                                                {connection.shopName}
                                                                            </Typography>
                                                                            {connection.pendingOrders !== undefined && (
                                                                                <Stack sx={{mt: 2.5}}>
                                                                                    <Stack direction={'row'} gap={1.5}>
                                                                                        <img
                                                                                            src={'/images/icons/pendingOrder.svg'}
                                                                                            alt={'orders'}/>
                                                                                        <Typography variant={'body2'}
                                                                                                    color={'#5C5F62'}
                                                                                                    fontSize={14}
                                                                                                    fontWeight={500}>
                                                                                            Pending Orders:
                                                                                            <Typography
                                                                                                component={'span'}
                                                                                                variant={'body2'}
                                                                                                color={'#202020'}
                                                                                                fontSize={14}
                                                                                                fontWeight={500}
                                                                                                marginLeft={.5}>
                                                                                                {connection.pendingOrders}
                                                                                            </Typography>
                                                                                        </Typography>
                                                                                    </Stack>
                                                                                    <Stack direction={'row'} gap={1.5}
                                                                                           sx={{mt: 1}}>
                                                                                        <img
                                                                                            src={'/images/icons/walletIcon.svg'}
                                                                                            alt={'orders'}/>
                                                                                        <Typography variant={'body2'}
                                                                                                    color={'#5C5F62'}
                                                                                                    fontSize={14}
                                                                                                    fontWeight={500}>
                                                                                            Revenue:
                                                                                            <Typography
                                                                                                component={'span'}
                                                                                                variant={'body2'}
                                                                                                color={'#202020'}
                                                                                                fontSize={14}
                                                                                                fontWeight={500}
                                                                                                marginLeft={.5}>
                                                                                                ${connection.revenue}
                                                                                            </Typography>
                                                                                        </Typography>
                                                                                    </Stack>
                                                                                </Stack>
                                                                            )}
                                                                        </div>
                                                                    </motion.div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {/* Render Print Providers */}
                        {groupedConnections['printProvider'] && (
                            <>
                                <Typography variant={'h6'} color={'#0D062D'} fontSize={16} fontWeight={600} gutterBottom
                                            sx={{mt: 4}}>
                                    Print Providers
                                </Typography>
                                <Grid container columnSpacing={5} rowGap={{lg: 0, xs: 2}}>
                                    {Object.keys(groupedConnections['printProvider']).map((type) => (
                                        <Grid item lg={3} md={6} xs={12} key={type}>
                                            <motion.div
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <div className={'connectedAccounts'}>
                                                    <div className={'connectedAccounts__header'}
                                                         style={{'--color': groupedConnections['printProvider'][type][0].color}}>
                                        <span className={'connectedAccounts__header--dot'}
                                              style={{'--color': groupedConnections['printProvider'][type][0].color}}></span>
                                                        <Typography variant={'h6'} color={'#0D062D'} fontSize={14}
                                                                    fontWeight={500}>
                                                            {type}
                                                        </Typography>
                                                    </div>
                                                    <div className={'connectedAccounts__content'}>
                                                        <Grid container spacing={2}>
                                                            {groupedConnections['printProvider'][type].map((connection) => (
                                                                <Grid item xs={12}
                                                                      key={connection.shopId}>
                                                                    <motion.div
                                                                        initial={{opacity: 0, y: 20}}
                                                                        animate={{opacity: 1, y: 0}}
                                                                        transition={{duration: 0.3}}
                                                                    >
                                                                        <div
                                                                            className={'connectedAccounts__content--list'}>
                                                                            <IconButton
                                                                                className={'connectedAccounts__content--list-floating'}
                                                                                onClick={(event) => handleClick(event, connection)}>
                                                                                <MoreHorizIcon/>
                                                                            </IconButton>
                                                                            <Chip
                                                                                label={connection.status === 'connected' ? 'Connected' : 'Expired'}
                                                                                color={connection.status === 'connected' ? 'primary' : 'error'}
                                                                                size={'small'}
                                                                                className={'label-chip no-round'}/>
                                                                            <Typography variant={'body2'}
                                                                                        color={'#202020'} fontSize={14}
                                                                                        noWrap
                                                                                        fontWeight={500}
                                                                                        marginTop={'10px'}>
                                                                                {connection.shopName}
                                                                            </Typography>
                                                                        </div>
                                                                    </motion.div>
                                                                </Grid>
                                                            ))}
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </div>
                ) : (
                    <Typography>No connections found</Typography>
                )}
            </Div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button'}}
            >
                {
                    selectedConnection?.accountType === 'marketplace' && (
                        <MenuItem onClick={handleViewStore} sx={{gap: 1}}>
                            <RemoveRedEyeOutlinedIcon fontSize={'medium'} color={'primary'}/>
                            View Store
                        </MenuItem>)
                }

                <MenuItem onClick={handleDisconnect} sx={{gap: 1}}>
                    <LinkOffIcon fontSize={'medium'} color={'primary'}/>
                    Disconnect
                </MenuItem>
            </Menu>

        </>
    );
};

export default ConnectionsView;
