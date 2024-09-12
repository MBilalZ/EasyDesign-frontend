import {useAuth} from "@/providers/AuthProvider.jsx";
import {Stack} from "@mui/system";
import {Button, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {LoginFormValidation} from "@/utils/index.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Login = () => {
    const {login} = useAuth();
    // Mui media query for responsive design
    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // console.log(login.status);
    const initialValue = {
        email: "",
        password: ""
    };
    const handleLogin = async (values) => {
        await login.login(values);
    };

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
                        {!mediumScreen && (<><Typography variant={'h2'} component={'h2'}>Login to your
                            account</Typography>
                            <Typography variant={'body1'} component={'p'}>Get the process started in less than 05
                                minutes.
                                Let us handle the rest.</Typography></>)}


                        <Formik
                            initialValues={initialValue}
                            validationSchema={LoginFormValidation}
                            onSubmit={handleLogin}
                        >
                            {(props) => {
                                return (
                                    <Form noValidate>
                                        <Field
                                            as={TextField}
                                            label="Email"
                                            type="Email"
                                            name="email"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            helperText={<ErrorMessage name="email"/>}
                                            error={props.errors.email && props.touched.email}
                                            required
                                            inputProps={{
                                                autoComplete: 'email',
                                            }}
                                        />

                                        <div className={'input-password'}>
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
                                            <Link to={'/auth/forgot-password'}>Forgot Password?</Link>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{
                                                    width: '50%'
                                                }}
                                                disabled={login.status === 'pending'}
                                            >
                                                {
                                                    login.status !== 'pending' ? 'Submit' : 'Loading...'
                                                }
                                            </Button>
                                        </Stack>
                                    </Form>
                                );
                            }}
                        </Formik>

                        <Divider sx={{my: 3}}>
                            <Typography variant={"body2"} component={'span'} fontWeight={'500'}>OR</Typography>
                        </Divider>

                        <Stack direction={"row"} spacing={2}>
                            <Button
                                variant="outlinedTransparent"
                                fullWidth
                                size="large"
                                sx={{
                                    width: '50%'
                                }}
                            >
                                <img src="/images/svgs/google_logo.svg" alt="google" style={{marginRight: '9px'}}/>
                                Google
                            </Button>
                            <Button
                                variant="outlinedTransparent"
                                fullWidth
                                size="large"
                                sx={{
                                    width: '50%'
                                }}
                            >
                                <img src="/images/svgs/facebook.svg" alt="google" style={{marginRight: '9px'}}/>

                                Facebook
                            </Button>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </>
    );
};

export default Login;
