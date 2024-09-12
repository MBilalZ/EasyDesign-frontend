import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Tab,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {useAuth} from '@/providers/AuthProvider.jsx';
import {useLocation, useSearchParams} from 'react-router-dom';
import {changePasswordValidation, profileValidation} from '@/utils/index.js';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import BaseNotificationBar from '@/components/base/BaseNotificationBar.jsx';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import {ConnectSvg, SubscriptionsSvg, UserIcon} from '@/assets/index.js';
import {toast} from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changePassword, updateProfile} from "@/services/user/index.js";
import Plans from "@/components/views/dashboard/my-account/includes/Plans.jsx";
import TransitionTable from "@/components/views/dashboard/my-account/includes/TransitionTable.jsx";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CardsWallet from "@/components/views/dashboard/my-account/includes/CardsWallet.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
const SmallAvatar = styled(Avatar)(({theme}) => ({
    width: 34,
    height: 34,
    padding: '5px',
    border: `4px solid #202020`,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
}));

const MainAccountContainer = styled(Box)(({theme}) => ({
    width: '100%',
    maxWidth: '270px',
    [theme.breakpoints.down('md')]: {
        maxWidth: '100%',
    },
}));

const TabHeader = styled(Box)(({theme}) => ({
    padding: '12px 20px',
    backgroundColor: theme.palette.primary.main,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
}));

const IconTab = styled(Tab)(({theme}) => ({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    minHeight: 50,
    fontSize: 12,
    color: 'rgba(32, 32, 32, 0.8) !important',
    fontWeight: 500,
    textTransform: 'capitalize',
    '& > svg': {
        width: 20,
        height: 20,
    },
}));

const MyAccountView = () => {
    const {user} = useAuth();
    const queryClient = useQueryClient();
    const fileInputRef = useRef(null);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [editMode, setEditMode] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const [value, setValue] = useState(searchParams.get('tab') || 'contact');
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [oldPasswordEye, setOldPasswordEye] = useState(false)
    const [newPasswordEye, setNewPasswordEye] = useState(false);

    const handleClickOldPasswordEye = () => {
        setOldPasswordEye(!oldPasswordEye)
    }
    useEffect(() => {
        if (location.hash) {
            const newTab = location.hash.replace('#', '');
            setValue(newTab);
        }
    }, [location]);
    const handleCickNewPasswordEye = () => {
        setNewPasswordEye(!newPasswordEye)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const {mutate: handleProfileUpdate, isPending} = useMutation({
        mutationKey: 'updateProfile',
        mutationFn: updateProfile,
        onSuccess: (response) => {
            queryClient.setQueryData(["me"], response?.data?.user);
            setEditMode(false);
            setTempImage(null);
            fileInputRef.current.value = '';
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });


    const {mutate: handlePasswordChange, isPending: passwordLoading} = useMutation({
        mutationKey: 'changePassword',
        mutationFn: changePassword,
        onSuccess: () => {
            setOpen(false)
            toast.success('Password Change Successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
    const initialProfileValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNo: user?.phoneNo || '',
    };

    const changePasswordInitialValues = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
    }

    useEffect(() => {
        const allowTabs = ['contact', 'card', 'transitions', 'subscription'];
        if (!allowTabs.includes(value)) {
            setValue('contact');
        }
    }, [value]);

    useEffect(() => {
        setSearchParams({tab: value});
    }, [value]);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);

    const handlePencilClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const handleFileChange = useCallback((event) => {
        const file = event.target.files[0];
        const imageAccepted = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!imageAccepted.includes(file.type)) {
            return toast.error('Invalid file type. Please upload a valid image file.');
        }

        if (file.size > 2097152) {
            return toast.error('Image size should not be more than 2MB');
        }
        if (file) {
            setTempImage(URL.createObjectURL(file));
        }
    }, []);

    const handleEditClick = useCallback((e) => {
        e.preventDefault();
        setEditMode(true);
    }, []);

    const handleProfileSubmit = async (values) => {
        const formData = new FormData();
        if (fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        }
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        handleProfileUpdate(formData);
    };

    const handleCancel = useCallback(
        (props) => {
            props.handleReset();
            setEditMode(false);
            setTempImage(null);
            fileInputRef.current.value = '';
        },
        [setEditMode]
    );


    const MakeAlert = () => {
        if (user?.plan?.planId === null) {
            return <Alert severity="error" sx={{
                mt: 2,

            }}>
                You are not subscribed to any plan. Please subscribe to a plan to access all features.
            </Alert>
        } else if (user?.plan?.paymentStatus !== 'paid') {
            return <Alert severity="error" sx={{
                mt: 2,

            }}>
                {user?.plan?.paymentStatus === 'pending' ? 'Your payment is pending. Please pay to access all features.' : user?.plan?.paymentStatus === 'failed' ? 'Your payment has failed. Please pay to access all features.' : 'Your payment has been cancelled. Please pay to access all features.'}

            </Alert>
        } else {
            return null;
        }
    }
    return (
        <div className={'tabContext'}>
            <BaseNotificationBar>
                <div>
                    <Stack spacing={2} direction={'row'} justifyContent={'space-between'} sx={{width: '100%'}}>
                        <div className={'accountHeader'}>
                            <Stack spacing={2} direction={isSmallScreen ? 'column' : 'row'}
                                   alignItems={isSmallScreen ? 'start' : 'center'}>
                                {editMode ? (
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                        badgeContent={
                                            <SmallAvatar
                                                alt="Edit Icon"
                                                src="/images/icons/edit-icon.svg"
                                                onClick={handlePencilClick}
                                                color={'primary'}
                                            />
                                        }
                                    >
                                        <Avatar
                                            alt={user.firstName}
                                            src={tempImage || user?.image || '/images/icons/default-avatar.png'}
                                            sx={{width: 70, height: 70}}
                                        />
                                    </Badge>
                                ) : (
                                    <Avatar
                                        alt={user.firstName}
                                        src={tempImage || user?.image || '/images/icons/default-avatar.png'}
                                        sx={{width: 70, height: 70}}
                                    />
                                )}

                                <div>
                                    <Typography variant={'h5'} fontSize={16} color={'#FFFFFF'} fontWeight={600}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                    {user.phoneNo && (
                                        <Stack spacing={1} direction={'row'} alignItems={'center'} sx={{mt: 1}}>
                                            <LocalPhoneRoundedIcon color={'primary'}/>
                                            <Typography variant={'body1'} fontSize={14} color={'#FFFFFFCC'}>
                                                {user.phoneNo}
                                            </Typography>
                                        </Stack>
                                    )}
                                    <Stack spacing={1} direction={'row'} alignItems={'center'} sx={{mt: 0.5}}>
                                        <EmailRoundedIcon color={'primary'}/>
                                        <Typography variant={'body1'} fontSize={14} color={'#FFFFFFCC'} noWrap>
                                            {user.email}
                                        </Typography>
                                    </Stack>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </div>
                <Stack>
                    <Stack direction={'row'}>
                        <AccountBalanceWalletOutlinedIcon color={'white'} opacity={.8}/>
                        <Typography variant={'body1'} fontWeight={500} fontSize={14} color={'#FFFFFFCC'} sx={{ml: 1}}>
                            Total Balance
                        </Typography>
                    </Stack>
                    <Typography variant={'h5'} fontWeight={600} fontSize={28} color={'primary'}
                                sx={{mt: 1}}>
                        $0.00
                    </Typography>
                </Stack>
            </BaseNotificationBar>

            <MakeAlert/>


            <TabContext value={value}>
                <Stack direction={isSmallScreen ? 'column' : 'row'} sx={{mt: 5}}>
                    <MainAccountContainer>
                        <TabHeader>
                            <Typography variant={'h6'} fontSize={16} color={'#FFFFFF'} fontWeight={600}>
                                My Account
                            </Typography>
                        </TabHeader>
                        <TabList
                            onChange={handleChange}
                            sx={{
                                border: '1px solid #cfcfcf',
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}
                            aria-label="Account Tabs"
                            orientation={'vertical'}
                        >
                            <IconTab sx={{
                                mt: 2
                            }} icon={<UserIcon/>} label="Contact details" value="contact"/>
                            <IconTab icon={<CreditCardOutlinedIcon/>} label="Cards & Wallet" value="card"/>
                            <IconTab icon={<ConnectSvg/>} label="Transactions" value="transitions"/>
                            <IconTab icon={<SubscriptionsSvg/>} label="Subscription" value="subscription"/>
                        </TabList>
                    </MainAccountContainer>
                    <div style={{flex: '1'}}>
                        <TabPanel value="contact">
                            <Typography variant={'h1'} fontSize={'22px'} fontWeight={'600'}>Contact Details</Typography>
                            <Typography variant={'body1'} fontSize={'14px'} color={'rgba(56, 56, 56, 0.8)'}
                                        marginTop={1} marginBottom={2}>
                                Get the process started in less than 05 minutes. Let<br/> us handle the rest.
                            </Typography>
                            <Formik
                                initialValues={initialProfileValues}
                                validationSchema={profileValidation}
                                onSubmit={handleProfileSubmit}
                            >
                                {(props) => (
                                    <Form noValidate>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    label={editMode ? 'First Name' : null}
                                                    placeholder={!editMode ? 'First Name' : user.firstName}
                                                    type="text"
                                                    name="firstName"
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="dense"
                                                    helperText={<ErrorMessage name="firstName"/>}
                                                    error={props.errors.firstName && props.touched.firstName}
                                                    InputProps={{
                                                        readOnly: !editMode,
                                                    }}
                                                    sx={{
                                                        'input': {
                                                            background: '#fff',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    label={editMode ? 'Last Name' : null}
                                                    placeholder={!editMode ? 'Last Name' : user.lastName}
                                                    type="text"
                                                    name="lastName"
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="dense"
                                                    helperText={<ErrorMessage name="lastName"/>}
                                                    error={props.errors.lastName && props.touched.lastName}
                                                    InputProps={{
                                                        readOnly: !editMode,
                                                    }}
                                                    sx={{
                                                        'input': {
                                                            background: '#fff',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    label={editMode ? 'Email' : null}
                                                    placeholder={!editMode ? 'Email' : user.email}
                                                    type="text"
                                                    name="email"
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="dense"
                                                    helperText={'Email cannot be changed. Contact support to update it.'}
                                                    error={props.errors.email && props.touched.email}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    sx={{
                                                        'input': {
                                                            background: '#fff',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Field
                                                    as={TextField}
                                                    label={editMode ? 'Phone Number' : null}
                                                    placeholder={!editMode ? 'Phone Number' : user.phoneNo}
                                                    type="text"
                                                    name="phoneNo"
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="dense"
                                                    helperText={<ErrorMessage name="phoneNo"/>}
                                                    error={props.errors.phoneNo && props.touched.phoneNo}
                                                    InputProps={{
                                                        readOnly: !editMode,
                                                    }}
                                                    sx={{
                                                        'input': {
                                                            background: '#fff',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    textAlign: 'right',
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    gap: '12px',
                                                    flexWrap: 'wrap',
                                                    flexDirection: {
                                                        xs: 'column',
                                                        md: 'row'
                                                    }
                                                }}
                                            >
                                                {editMode ? (
                                                    <>
                                                        <Button disabled={isPending} variant={'contained'}
                                                                color={'primary'} type={'submit'}>
                                                            Save
                                                        </Button>
                                                        <Button
                                                            variant={'outlinedTransparent'}
                                                            sx={{fontWeight: 'normal'}}
                                                            color={'primary'}
                                                            onClick={() => handleCancel(props)}
                                                            type={'button'}
                                                            disabled={isPending}

                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant={'contained'}
                                                            color={'primary'}
                                                            type={'button'}
                                                            onClick={handleEditClick}
                                                        >
                                                            Edit Profile
                                                        </Button>
                                                        <Button
                                                            variant={'outlinedTransparent'}
                                                            sx={{fontWeight: 'normal'}}
                                                            color={'primary'}
                                                            type={'button'}
                                                            onClick={handleOpen}
                                                        >
                                                            Change Password
                                                        </Button>
                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </TabPanel>
                        <TabPanel value="card">
                            <Elements stripe={stripePromise}>
                                <CardsWallet/>
                            </Elements>
                        </TabPanel>
                        <TabPanel value="transitions">
                            <TransitionTable/>
                        </TabPanel>
                        <TabPanel value="subscription">
                            <Plans/>
                        </TabPanel>
                    </div>
                </Stack>
            </TabContext>
            <Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth>
                <Box sx={{padding: '30px 15px', width: '100%'}}>
                    <div style={{textAlign: 'center'}}>
                        <img src={'/images/icons/lock-circle.png'} alt={'lock-circle'}/>
                    </div>
                    <DialogTitle textAlign={'center'} sx={{paddingTop: 0}}>
                        <Typography variant={'h6'} fontSize={22} fontWeight={600}>
                            Change Password
                        </Typography>
                        <Typography variant={'body1'} fontSize={14} color={'rgba(56, 56, 56, 0.8)'} marginTop={1}>
                            Please enter your new password to change it.
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={changePasswordInitialValues}
                            validationSchema={changePasswordValidation}
                            onSubmit={handlePasswordChange}
                        >
                            {(props) => (
                                <Form>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                label="Old Password"
                                                type={oldPasswordEye ? 'text' : 'password'}
                                                name="oldPassword"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                helperText={<ErrorMessage name="oldPassword"/>}
                                                error={props.errors.oldPassword && props.touched.oldPassword}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickOldPasswordEye}
                                                            edge="end"
                                                        >
                                                            {oldPasswordEye ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                label="New Password"
                                                type={newPasswordEye ? 'text' : 'password'}
                                                name="password"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                helperText={<ErrorMessage name="password"/>}
                                                error={props.errors.password && props.touched.password}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleCickNewPasswordEye}
                                                            edge="end"
                                                        >
                                                            {newPasswordEye ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                as={TextField}
                                                label={'Confirm Password'}
                                                type="password"
                                                name="confirmPassword"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                helperText={<ErrorMessage name="confirmPassword"/>}
                                                error={props.errors.confirmPassword && props.touched.confirmPassword}
                                                sx={{
                                                    'input': {
                                                        background: '#fff',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider sx={{my: 1.2}}/>
                                        </Grid>
                                        <Grid item xs={12}
                                              sx={{
                                                  textAlign: 'right',
                                                  display: 'flex',
                                                  justifyContent: 'flex-end',
                                                  gap: '12px',
                                                  flexWrap: 'wrap',
                                                  flexDirection: {
                                                      xs: 'column',
                                                      md: 'row'
                                                  }
                                              }}>
                                            <Button variant={'contained'} color={'primary'} type={'submit'}>
                                                Change Password
                                            </Button>
                                            <Button variant={'outlinedTransparent'} sx={{fontWeight: 'normal'}}
                                                    color={'primary'}
                                                    onClick={handleClose} type={'button'}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Box>
            </Dialog>
        </div>
    );
};

export default MyAccountView;
