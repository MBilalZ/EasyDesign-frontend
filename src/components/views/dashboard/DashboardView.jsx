import {Button, Grid, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {AnnounceSvg, MoneySvg} from "@/assets";
import {useTheme} from "@mui/material/styles";
import QueueOrders from "@/components/views/dashboard/includes/QueueOrders.jsx";
import BalanceSheet from "@/components/views/dashboard/includes/BalanceSheet.jsx";
import TopSellingProduct from "@/components/views/dashboard/includes/TopSellingProduct.jsx";
import globeSvg from "@/assets/backgrounds/globe.svg";
import BaseDatePicker from "@/components/base/BaseDatePicker.jsx";
import React, {useState} from "react";
import BaseDataTable from "@/components/base/BaseDataTable.jsx";
import Div from "@/components/base/Div.jsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz.js";
import BaseNotificationBar from "@/components/base/BaseNotificationBar.jsx";
import {useDispatch} from "react-redux";

const CustomMarketPlace = ({marketPlace}) => {
    return (
        <Stack direction={'row'} alignItems={'center'} columnGap={1}>
            <img src={marketPlace.icon} alt={'marketplace'} style={{width: 28, height: 28}}/>
            <Typography variant={'body2'} fontSize={14} color={'#383838'} fontWeight={600}>
                {marketPlace.name}
            </Typography>
        </Stack>
    );
};

const DashboardView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [dates, setDates] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showExportButton, setShowExportButton] = useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewStore = () => {
        console.log('View Store');
        handleClose();
    };

    const handleDisconnect = () => {
        console.log('Disconnect');
        handleClose();
    };


    const data = [
        {
            "Market place": <CustomMarketPlace
                marketPlace={{name: 'Amazon', icon: '/images/icons/amazon-square.png'}}/>,
            "Store Name": "Amazon Store",
            "Pending Orders": 10,
            "Last order delvered": "2 hours ago",
            "Revenue": "$1000",
            "Action": <IconButton onClick={handleClick}>
                <MoreHorizIcon/>
            </IconButton>
        },
        {
            "Market place": <CustomMarketPlace marketPlace={{name: 'Etsy', icon: '/images/icons/etsy-square.png'}}/>,
            "Store Name": "Ebay Store",
            "Pending Orders": 20,
            "Last order delvered": "3 hours ago",
            "Revenue": "$2000",
            "Action": <IconButton onClick={handleClick}>
                <MoreHorizIcon/>
            </IconButton>
        }
    ];

    const columns = [
        {name: "Market place", options: {sort: false}},
        {name: "Store Name", options: {sort: false}},
        {name: "Pending Orders", options: {sort: false}},
        {name: "Last order delvered", options: {sort: false}},
        {name: "Revenue", options: {sort: false}},
        {name: "Action", options: {sort: false}},
    ];

    const options = {
        textLabels: {
            body: {
                noMatch: "Sorry, no matching records found"
            },
        },
    };

    return (
        <>
            <BaseNotificationBar allowMargin={true}>
                <Stack direction={'row'} alignItems={'center'} columnGap={2}>
                    <Stack justifyContent={'center'} alignItems={'center'} style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: theme.palette.white.main,
                        borderRadius: '50%',
                        flex: '0 0 auto'
                    }}>
                        <AnnounceSvg/>
                    </Stack>
                    <div>
                        <Typography variant={'body2'} fontSize={16} color={'#fff'} fontWeight={600} marginBottom={.5}>
                            The easiest way to increase sales up to 25 times.
                        </Typography>
                        <Typography variant={'body2'} fontSize={10} color={'#fff'} fontWeight={300}>
                            Lorem ipsum dolor sit amet consectetur. Dolor est nec pharetra quam malesuada maecenas.
                        </Typography>
                    </div>
                </Stack>
                <Stack direction={'row'} columnGap={2}>
                    <MoneySvg/>
                    <Button variant={'contained'} color={'white'}>Try now</Button>
                </Stack>
            </BaseNotificationBar>
            <Stack direction={'row'} justifyContent={'flex-end'}>
                <Stack direction={'row'} columnGap={2} alignItems={'center'} sx={{marginTop: 2}}>
                    <Typography variant={'body2'} fontSize={14} color={'#383838'} fontWeight={600}>
                        Date
                    </Typography>
                    <BaseDatePicker value={dates} setValue={setDates}/>
                    <Button variant={'contained'} size={'small'}>
                        Search
                    </Button>
                </Stack>
            </Stack>
            <Grid container spacing={2} sx={{marginTop: 4, width: '100%'}}>
                <Grid item xl={3} md={6} xs={12}>
                    <QueueOrders/>
                </Grid>
                <Grid item xl={6} xs={12} order={{xl: 2, xs: 3}}>
                    <BalanceSheet sx={{p: 2}}/>
                </Grid>
                <Grid item xl={3} md={6} xs={12} order={{xl: 3, xs: 2}}>
                    <TopSellingProduct sx={{
                        p: 2,
                        position: 'relative',
                        background: `url(${globeSvg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 2,
                        backgroundColor: theme.palette.white.main,
                        height: '100%'
                    }}/>
                </Grid>
            </Grid>
            <Div sx={{marginTop: 5}} className={'home-data-table'}>
                <BaseDataTable title={'Your Stores'} options={options} data={data}
                               columns={columns}/>
            </Div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{'aria-labelledby': 'basic-button'}}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 1, // Margin to ensure it doesn't overlap the content
                        minWidth: 160, // Adjust as needed
                    }
                }}
            >
                <MenuItem onClick={handleViewStore} sx={{gap: 1}}>
                    <img src={'/images/icons/eye-half-color.svg'} alt={'switch store'}/>
                    View Store
                </MenuItem>
                <MenuItem onClick={handleDisconnect} sx={{gap: 1}}>
                    <img src={'/images/icons/disconnect-color.svg'} alt={'disconnect store'}/>
                    Disconnect
                </MenuItem>
            </Menu>
        </>
    );
};

export default DashboardView;
