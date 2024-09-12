import {Avatar, Button, Chip, IconButton, Stack, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import React, {useCallback, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getMarketPlaces,
    selectSelectedMarketPlace,
    setSelectedMarketPlace
} from "@/features/connections/connectionSlice.js";

const MultiMarketPlace = ({setOpenConnectionDialog}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMultiMarketPlaces = Boolean(anchorEl);
    const navigate = useNavigate();
    const selectedMarketPlace = useSelector(selectSelectedMarketPlace);
    const marketPlaces = useSelector(getMarketPlaces);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMarketPlaceClose = () => {
        setAnchorEl(null);
    };

    const handleViewStore = () => {
        handleMarketPlaceClose()
        setTimeout(() => {
            navigate('/dashboard/connections');
        }, 500)
    }

    const selectMarketPlace = useCallback((shopId) => {
        dispatch(setSelectedMarketPlace({id: shopId}));
        handleMarketPlaceClose();
    }, [dispatch]);

    const renderLogo = (type) => {
        switch (type) {
            case 'Etsy':
                return <Avatar sx={{width: 33, height: 33}} src={'/images/icons/etsy.svg'}/>
            case 'Amazon':
                return <Avatar sx={{width: 33, height: 33}} src={'/images/icons/amazon.svg'}/>
            case 'Shopify':
                return <Avatar sx={{width: 33, height: 33}} src={'/images/icons/shopify.svg'}/>
            case 'Wix':
                return <Avatar sx={{width: 33, height: 33}} src={'/images/icons/wix.svg'}/>
            default:
                return <Avatar sx={{width: 33, height: 33}} src={'/images/icons/etsy.svg'}/>
        }
    }

    const renderStatus = (status) => {
        switch (status) {
            case 'connected':
                return <Chip label={'Active'} size={'small'} color={'primary'} className={'label-chip'}/>
            case 'inactive':
                return <Chip label={'Inactive'} size={'small'} className={'label-chip'}/>
            case 'expire':
                return <Chip label={'Expire'} size={'small'} color={'error'} className={'label-chip'}/>
            default:
                return <Chip label={'Default'} size={'small'} className={'label-chip'}/>
        }
    }
    return (
        <div className={'list-menu-marketplace'}>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ml: 2, gap: 2, width: '100%'}}
                aria-controls={openMultiMarketPlaces ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMultiMarketPlaces ? 'true' : undefined}
                disableRipple
                className={'multi-market-place'}
            >
                <Stack direction={'row'} gap={2}>
                    {renderLogo(selectedMarketPlace?.type)}
                    <div style={{textAlign: 'left'}}>
                        <Typography variant={'body2'} component={'p'} fontSize={14}
                                    fontWeight={'500'} color={'#FFFFFF'}>
                            {selectedMarketPlace?.type}
                        </Typography>
                        <Typography variant={'body2'} component={'div'}
                                    fontWeight={600} color={'#FFFFFFCC'} fontSize={12}>
                            {selectedMarketPlace?.shopName}
                        </Typography>
                    </div>
                </Stack>
                {openMultiMarketPlaces ? <ExpandLess/> : <ExpandMore/>}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="market-place-list"
                open={openMultiMarketPlaces}
                onClose={handleMarketPlaceClose}
                onClick={handleMarketPlaceClose}
                PaperProps={{
                    elevation: 0,
                }}
                sx={{
                    mb: 2,
                    '& .MuiMenu-paper': {
                        width: '100%',
                        maxWidth: 270,
                        backgroundColor: '#2C2C2C',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        marginTop: 1,
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: '#3A3A3A',
                        },
                    },

                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {
                    marketPlaces.map((marketPlace, index) => (
                        <MenuItem key={index} onClick={() => selectMarketPlace(marketPlace.shopId)}
                                  selected={marketPlace?.selected}
                                  sx={{mb: 1}}>
                            <Stack direction={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'}
                                   width={'100%'}>
                                <Stack direction={'row'} gap={2} style={{textAlign: 'left'}}>
                                    {renderLogo(marketPlace?.type)}
                                    <div>
                                        <Typography variant={'body2'} component={'p'} fontSize={14}
                                                    fontWeight={'500'} color={'#FFFFFF'}>
                                            {marketPlace?.type}
                                        </Typography>
                                        <Typography variant={'body2'} component={'div'}
                                                    fontWeight={600} color={'#FFFFFFCC'} fontSize={12}>
                                            {marketPlace?.shopName}
                                        </Typography>
                                    </div>
                                </Stack>
                                {renderStatus(marketPlace?.status)}
                            </Stack>
                        </MenuItem>
                    ))
                }

                <Stack direction={'row'} mt={3} mx={2} mb={1} gap={2} className={'button-actions'}>
                    <Button
                        color={'primary'} startIcon={<AddIcon/>} variant={'contained'}
                        sx={{width: '50%', py: 1, px: .5}}
                        size={'small'}
                        onClick={() => setOpenConnectionDialog(true)}
                    >Add Store</Button>
                    <Button
                        color={'white'}
                        startIcon={<VisibilityIcon/>}
                        variant={'outlined'}
                        sx={{width: '50%', py: 1, px: .5}} size={'small'}
                        onClick={handleViewStore}>View Store</Button>
                </Stack>
            </Menu>
        </div>
    )
}

export default MultiMarketPlace;