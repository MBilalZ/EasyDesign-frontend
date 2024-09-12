import React, {useState} from 'react';
import {Stack} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import {Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {setPasswordValidation} from "@/utils/index.js";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOff from "@mui/icons-material/VisibilityOff.js";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "@/services/auth/index.js";
import {toast} from "react-hot-toast";

const SetPassword = ({token}) => {
    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {mutate: handleSubmit, isPending} = useMutation({
        mutationKey: 'setPassword',
        mutationFn: (values) => resetPassword({...values, token}),
        onSuccess: () => {
            toast.success('Password has been set successfully');
            localStorage.removeItem('resetPasswordToken');
            navigate('/auth/login');
        }
    })
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const initialValue = {
        password: '',
        confirmPassword: '',
    }


    return (
        <>
            <Stack className={"authContainer"} direction={{
                xs: 'column',
                md: 'row'
            }}>
                <div className="authContainer__left">
                    {
                        !mediumScreen && <div>
                            <Link to={'/auth/login'} className={'authContainer__left--logo'}>
                                <img src="/images/logo.svg" alt="logo"/>
                                <div className={'authContainer__left--logoText'}>
                                    <Typography variant={'body1'} fontSize={22.32} fontWeight={'800'}
                                                lineHeight={1} color={'white'}>Easy</Typography>
                                    <Typography variant={'body2'} fontSize={22.32} fontWeight={'300'}
                                                lineHeight={1} color={'white'}>Design</Typography>
                                </div>
                            </Link>
                        </div>
                    }

                    <div className={'authContainer__left--content'}>
                        <>
                            {mediumScreen ? <div className={'authContainer__left--content-small'}>
                                <img src="/images/big-logo.svg" alt="logo"/>
                                <Typography variant={'h2'} component={'h2'}>Welcome Back!</Typography>
                                <Typography variant={'body1'} component={'p'}>Login to your account</Typography>
                            </div> : <><Typography variant={'h1'} component={'h1'}>Welcome
                                Back!</Typography>
                                <Typography variant={'body1'} component={'p'}>We provide lorem ipsum team dolor sit
                                    amet,
                                    consectetur adipiscing performance.</Typography>
                                <div className={'authContainer__left--content-features'}>
                                    <div className={'authContainer__left--content-features--item'}>
                                        <img src="/images/features/feature1.svg" alt="feature1"/>
                                        <div>
                                            <Typography variant={'h6'} component={'h6'}>Absolutely FREE</Typography>
                                            <Typography variant={'body2'} component={'p'}>No hidden charges, No credit
                                                card
                                                required</Typography>
                                        </div>
                                    </div>
                                    <div className={'authContainer__left--content-features--item'}>
                                        <img src="/images/features/feature2.svg" alt="feature1"/>
                                        <div>
                                            <Typography variant={'h6'} component={'h6'}>Fast & Easy</Typography>
                                            <Typography variant={'body2'} component={'p'}>Get access instantly, no
                                                downloads
                                                required</Typography>
                                        </div>
                                    </div>
                                    <div className={'authContainer__left--content-features--item'}>
                                        <img src="/images/features/feature3.svg" alt="feature1"/>
                                        <div>
                                            <Typography variant={'h6'} component={'h6'}>Your Own Data</Typography>
                                            <Typography variant={'body2'} component={'p'}>Enjoy the Free Trial with your
                                                company
                                                data</Typography>
                                        </div>
                                    </div>
                                    <div className={'authContainer__left--content-features--item'}>
                                        <img src="/images/features/feature4.svg" alt="feature1"/>
                                        <div>
                                            <Typography variant={'h6'} component={'h6'}>Unlimited Features</Typography>
                                            <Typography variant={'body2'} component={'p'}>Access all features of the
                                                world's #1
                                                POS software!</Typography>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        </>
                    </div>
                </div>
                <div className="authContainer__right">
                    <div className={'authContainer__right--content'}>
                        <Typography variant={'body1'} component={'p'} fontWeight={'600'}
                                    className={'authContainer__right--content-top'}>Don't have an account? <Link
                            to={'/auth/sign-up'}>Sign Up</Link></Typography>
                        {!mediumScreen && (<><Typography variant={'h2'} component={'h2'}>
                            Set Password
                        </Typography>
                            <Typography variant={'body1'} component={'p'}>
                                Create a new password for your account
                            </Typography></>)}


                        <Formik
                            initialValues={initialValue}
                            validationSchema={setPasswordValidation}
                            onSubmit={handleSubmit}
                        >
                            {(props) => {
                                return (
                                    <Form noValidate>
                                        <Field
                                            as={TextField}
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            helperText={<ErrorMessage name="password"/>}
                                            error={props.errors.password && props.touched.password}
                                            required
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                        />

                                        <div className={'input-password'}>
                                            <Field
                                                as={TextField}
                                                label="Confirm Password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                fullWidth
                                                variant="outlined"
                                                margin="dense"
                                                helperText={<ErrorMessage name="confirmPassword"/>}
                                                error={props.errors.confirmPassword && props.touched.confirmPassword}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                                required
                                            />
                                        </div>

                                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                                               mt={5}>
                                            <Link to={'/auth/login'} className={'back-with-icon'}>
                                                 <span>
                                                        <img src="/images/icons/arrow-left.svg" alt="arrow-left"/>
                                                 </span> <span>Back to Login</span>
                                            </Link>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{
                                                    width: '50%'
                                                }}
                                                disabled={isPending}
                                            >
                                                {isPending ? 'Loading...' : 'Set Password'}
                                            </Button>
                                        </Stack>
                                    </Form>
                                );
                            }}
                        </Formik>

                    </div>
                </div>
            </Stack>
        </>
    );
};

export default SetPassword;