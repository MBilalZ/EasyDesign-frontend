import {Stack} from "@mui/system";
import {Button, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {forgotPasswordValidation} from "@/utils/index.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {forgotPassword} from "@/services/auth/index.js";
import {useRef} from "react";
import {toast} from "react-hot-toast";

const ForgotPassword = () => {
    const theme = useTheme();
    const formikRef = useRef();
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const initialValue = {
        email: ""
    };
    const handleForgotPassword = async (values) => {
        try {
            const response = await forgotPassword(values.email);
            toast.success(response?.message || 'Password reset link sent to your email');
        } catch (error) {
            if (error?.response?.data) {
                formikRef.current.setErrors({
                    email: error.response.data.message
                });
            }
        }
    };

    return (
        <>
            <Stack className={"authContainer"} direction={{
                xs: 'column',
                md: 'row'
            }}>
                <div className="authContainer__left">
                    {!mediumScreen && (<div>
                        <Link to={'/auth/login'} className={'authContainer__left--logo'}>
                            <img src="/images/logo.svg" alt="logo"/>
                            <div className={'authContainer__left--logoText'}>
                                <Typography variant={'body1'} fontSize={22.32} fontWeight={'800'}
                                            lineHeight={1} color={'white'}>Easy</Typography>
                                <Typography variant={'body2'} fontSize={22.32} fontWeight={'300'}
                                            lineHeight={1} color={'white'}>Design</Typography>
                            </div>
                        </Link>
                    </div>)}
                    <div className={'authContainer__left--content'}>
                        <>
                            {mediumScreen ? <div className={'authContainer__left--content-small'}>
                                <Link to={'/auth/login'}>
                                    <img src="/images/big-logo.svg" alt="logo"/>
                                </Link>
                                <Typography variant={'h2'} component={'h2'}>Welcome Back!</Typography>
                                <Typography variant={'body1'} component={'p'}>Forgot password</Typography>
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
                        {!mediumScreen && (<><Typography variant={'h2'} component={'h2'}>Forgot password</Typography>
                            <Typography variant={'body1'} component={'p'}>Enter your email address and we’ll send you a
                                link
                                to reset your password</Typography></>)}
                        <Formik
                            initialValues={initialValue}
                            validationSchema={forgotPasswordValidation}
                            onSubmit={handleForgotPassword}
                            innerRef={formikRef}
                        >
                            {(props) => {
                                return (
                                    <Form noValidate autoComplete={'off'}>
                                        <Field
                                            as={TextField}
                                            label="Email"
                                            type="Email"
                                            name="email"
                                            autoComplete="off"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            helperText={<ErrorMessage name="email"/>}
                                            error={props.errors.email && props.touched.email}
                                            required
                                            inputProps={{
                                                autocomplete: 'new-password',
                                                form: {
                                                    autocomplete: 'off',
                                                },
                                            }}
                                        />

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
                                            >
                                                Submit
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

export default ForgotPassword;
