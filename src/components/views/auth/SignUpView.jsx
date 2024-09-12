import {Stack} from "@mui/system";
import {Button, Step, StepButton, StepLabel, Stepper, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {registerFormValidation} from "@/utils/index.js";
import {Form, Formik} from "formik";
import {useRef, useState} from "react";
import {toast} from "react-hot-toast";
import SignUpViewOne from "./includes/SignupViewOne.jsx";
import SignupViewTwo from "@/components/views/auth/includes/SignupViewTwo.jsx";
import SignUpViewThree from "@/components/views/auth/includes/SignupViewThree.jsx";
import SignupViewFour from "@/components/views/auth/includes/SignupViewFour.jsx";
import {CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "react-slick";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {emailCheck, register} from "@/services/auth/index.js";
import {getAllPlans} from "@/services/general/index.js";
import {useAuth} from "@/providers/AuthProvider.jsx";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // remove the arrows
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
};

const SignUpView = () => {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const {setUser, setRequiredUser, setIsLoggedIn} = useAuth();
    const formikRef = useRef();
    const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const steps = mediumScreen
        ? ["Seller", "Password", "Plans", "Payment"]
        : ["Seller details", "Create password", "Our Plans", "Payment Details"];
    const [activeStep, setActiveStep] = useState(0);
    const stripe = useStripe();
    const elements = useElements();
    const [stripeErrors, setStripeErrors] = useState(null);
    const [errorStep, setErrorStep] = useState(null);
    const [emailCheckLoading, setEmailCheckLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const {data: planData} = useQuery({
        queryKey: ['plans'],
        queryFn: getAllPlans,
        refetchOnWindowFocus: false,
        cacheTime: 24 * 60 * 60 * 1000, // 24 hours
        // if the data is already in the cache then don't refetch
        refetchOnMount: false,
    });
    const validateEmailOnBlur = async (email, setFieldError) => {
        return new Promise(async (resolve, reject) => {

            if (!email) return;
            setEmailCheckLoading(true);
            try {
                const response = await emailCheck({email});
                if (response.message.includes('already exists')) {
                    setFieldError('email', 'Email already exists');
                    setEmailValid(false);
                    resolve(false);
                } else {
                    setEmailValid(true);
                    resolve(true);
                }
            } catch (error) {
                console.error(error);
                reject(false);
            } finally {
                setEmailCheckLoading(false);
            }
        });
    };
    const {mutate: handleUserRegister, isPending: loading} = useMutation({
        mutationFn: register,
        onSuccess: ({data}) => {
            toast("Signup Successfully", {type: "success"});
            setIsLoggedIn(true);
            setUser({...data.user, role: 1});
            setRequiredUser(false);
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['me'], {...data.user, role: 1});
            navigate('/dashboard');
        },
        onError: (err) => {
            // toast("Something went wrong", {type: "error"});
            if (err?.response?.data?.errors) {
                // my formik is {field: message}
                const {errors} = err.response.data;
                formikRef.current.setErrors(errors);
                //set the 1 step if the error is in the first step
                // step 1 contains firstName, lastName, email, terms
                if (errors.firstName || errors.lastName || errors.email || errors.terms) {
                    setErrorStep(0);
                } else if (errors.password || errors.confirmPassword) {
                    setErrorStep(1);
                } else if (errors.plan) {
                    setErrorStep(2);
                } else if (errors.promoCode || errors.country || errors.zipcode) {
                    setErrorStep(3);
                }
            } else if (err?.response?.data?.message) {
                toast(err.response.data.message, {type: "error"});
            }
        }
    })


    const handleNext = async (validateForm, setErrors, setTouched) => {
        const errors = await validateForm();
        // also check email is valid or not in the first step
        if (activeStep === 0 && !emailValid) {
            const data = await validateEmailOnBlur(formikRef.current.values.email, formikRef.current.setFieldError);
            if (!data) {
                return;
            }
        }
        if (Object.keys(errors).length === 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setErrorStep(null);
        } else {
            setErrors(errors);
            setTouched(errors); // Set touched to show validation messages
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const initialValue = {
        firstName: "",
        lastName: "",
        email: "",
        terms: false,
        password: "",
        confirmPassword: "",
        plan: "",
        country: "",
        zipcode: "",
        promoCode: ""
    };

    const validateStripeElements = async (values) => {
        const cardNumberElement = elements.getElement(CardNumberElement);

        if (!cardNumberElement) {
            return false;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: cardNumberElement,
            billing_details: {
                email: values.email,
                name: values.firstName + " " + values.lastName,
                address: {
                    country: values.country,
                    postal_code: values.zipcode
                }
            },
        });

        if (error) {
            setStripeErrors(error.message);
            toast.error(error.message)
            return false;
        } else {
            setStripeErrors(null);
            console.log("Stripe Valid", paymentMethod);
            return paymentMethod;
        }
    };

    const handleSignUp = async (values, {setSubmitting, setErrors}) => {
        setSubmitting(true);
        const isStripeValid = await validateStripeElements(values);
        if (!isStripeValid) {
            setSubmitting(false);
            return;
        }

        // Handle payment confirmation and any other logic here
        try {
            await handleUserRegister({...values, payment_method: isStripeValid.id})

        } catch (e) {
            console.log(e)
        }
        setSubmitting(false);

    };

    const handleSubmit = async (validateForm, submitForm, setErrors, setTouched, values, actions) => {
        const formErrors = await validateForm();
        const isStripeValid = await validateStripeElements(values);
        if (Object.keys(formErrors).length === 0) {
            if (isStripeValid) {
                submitForm(values, actions);
            }
        } else {
            setErrors(formErrors);
            setTouched(formErrors);

        }
    };


    return (
        <>
            <Stack className={"authContainer"} direction={{xs: "column", md: "row"}}>
                <div className="authContainer__left">
                    {mediumScreen ? (
                        <div className={"authContainer__left--content-small"}>
                            <img src="/images/big-logo.svg" alt="logo"/>
                            <Typography variant={"h2"} component={"h2"}>
                                {activeStep === 0 && "Launch your Store now"}
                                {activeStep === 1 && "Create secure password"}
                                {activeStep === 2 && "Choose your plan"}
                                {activeStep === 3 && "Payment Details"}
                            </Typography>
                        </div>
                    ) : (
                        <div>
                            <Link to="/auth/login" className={"authContainer__left--logo"}>
                                <img src="/images/logo.svg" alt="logo"/>
                                <div className={"authContainer__left--logoText"}>
                                    <Typography
                                        variant={"body1"}
                                        fontSize={22.32}
                                        fontWeight={"800"}
                                        lineHeight={1}
                                        color={"white"}
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
                    )}
                    <div className={"authContainer__left--content"}>
                        <Stepper
                            activeStep={activeStep}
                            orientation={mediumScreen ? "horizontal" : "vertical"}
                            className={"signUpStepper"}
                        >
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepButton
                                        color={"inherit"}
                                        onClick={() => setActiveStep(index)}
                                        disableRipple={true}
                                    >
                                        <StepLabel error={
                                            errorStep === index
                                        }>{label}</StepLabel>
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>

                        <div
                            className={`authContainer__left--content-bottom ${activeStep === 1 && "full"}`}
                        >
                            {!mediumScreen && activeStep === 0 && (
                                <Slider {...settings}>
                                    <div className={"slick-list-item"}>
                                        <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                            I could have really used the product back when I was a freelancer. I was a
                                            good at running a store but a terrible designer .
                                        </Typography>
                                        <div className={"slick-list-item--author"}>
                                            <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                                <span>John Doe</span>
                                            </Typography>
                                            <Typography variant={"body2"} color={"#38383899 !important"}
                                                        fontWeight={400}>
                                                <span>CEO, Company Name</span>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={"slick-list-item"}>
                                        <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                            I could have really used the product back when I was a freelancer. I was a
                                            good at running a store but a terrible designer .
                                        </Typography>
                                        <div className={"slick-list-item--author"}>
                                            <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                                <span>John Doe</span>
                                            </Typography>
                                            <Typography variant={"body2"} color={"#38383899 !important"}
                                                        fontWeight={400}>
                                                <span>CEO, Company Name</span>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={"slick-list-item"}>
                                        <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                            I could have really used the product back when I was a freelancer. I was a
                                            good at running a store but a terrible designer .
                                        </Typography>
                                        <div className={"slick-list-item--author"}>
                                            <Typography variant={"body2"} color={"black !important"} fontWeight={500}>
                                                <span>John Doe</span>
                                            </Typography>
                                            <Typography variant={"body2"} color={"#38383899 !important"}
                                                        fontWeight={400}>
                                                <span>CEO, Company Name</span>
                                            </Typography>
                                        </div>
                                    </div>
                                </Slider>
                            )}
                            {!mediumScreen && activeStep === 1 && (
                                <>
                                    <Typography
                                        variant={"body2"}
                                        color={"white !important"}
                                        fontSize={30}
                                        lineHeight={1.2}
                                        fontWeight={600}
                                        marginBottom={3}
                                    >
                                        A few clicks away
                                        <br/> from creating
                                        <br/> your store
                                    </Typography>
                                    <Typography variant={"body2"} color={"white !important"} fontSize={14}>
                                        Get started with your store in less than 5 minutes. Let us handle the rest.
                                    </Typography>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="authContainer__right">
                    <div className={"authContainer__right--content"}>
                        <Typography
                            variant={"body1"}
                            component={"p"}
                            fontWeight={"600"}
                            className={"authContainer__right--content-top"}
                        >
                            Already have an account? <Link to="/auth/login">Login</Link>
                        </Typography>
                        {!mediumScreen && (
                            <>
                                <Typography variant={"h2"} component={"h2"}>
                                    {activeStep === 0 && "Launch your Store now"}
                                    {activeStep === 1 && "Create secure password"}
                                    {activeStep === 2 && "Choose your plan"}
                                    {activeStep === 3 && "Payment Details"}
                                </Typography>
                                <Typography variant={"body1"} component={"p"}>
                                    Get the process started in less than 05 minutes. Let us handle the rest.
                                </Typography>
                            </>
                        )}
                        <Formik
                            initialValues={initialValue}
                            validationSchema={registerFormValidation[activeStep]}
                            onSubmit={handleSignUp}
                            innerRef={formikRef}
                        >
                            {(props) => {
                                const {validateForm, submitForm, setErrors, setTouched, isSubmitting} = props;
                                const {plan} = props.values;
                                return (
                                    <Form noValidate autoComplete={"off"}>
                                        {activeStep === 0 && <SignUpViewOne props={props} loading={emailCheckLoading}
                                                                            validateEmailOnBlur={validateEmailOnBlur}/>}
                                        {activeStep === 1 && <SignupViewTwo props={props}/>}
                                        {activeStep === 2 &&
                                            <SignUpViewThree plans={planData.plans} props={props} value={plan}/>}
                                        {activeStep === 3 && (
                                            <SignupViewFour props={props} errors={stripeErrors}
                                                            mediumScreen={{mediumScreen}}/>
                                        )}
                                        {activeStep === 0 && (
                                            <Button
                                                variant="contained"
                                                type="button"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{
                                                    width: mediumScreen ? "100%" : "50%",
                                                    marginTop: "30px",
                                                }}
                                                onClick={() => handleNext(validateForm, setErrors, setTouched)}
                                            >
                                                Start my business
                                            </Button>
                                        )}
                                        {(activeStep === 1 || activeStep === 2) && (
                                            <Stack direction="row" spacing={2} justifyContent={"space-between"}
                                                   sx={{marginTop: 6}}>
                                                <Button variant="outlinedTransparent" onClick={handleBack}
                                                        size={"medium"}>
                                                    Previous
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    type="button"
                                                    color="primary"
                                                    size={"medium"}
                                                    onClick={() => handleNext(validateForm, setErrors, setTouched)}
                                                >
                                                    Next
                                                </Button>
                                            </Stack>
                                        )}
                                        {activeStep === 3 && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                sx={{
                                                    width: mediumScreen ? "100%" : "50%",
                                                    marginTop: "30px",
                                                }}
                                                type="button"
                                                disabled={loading || isSubmitting}
                                                onClick={() => handleSubmit(validateForm, submitForm, setErrors, setTouched, props.values, props)}
                                            >
                                                Start free trial
                                            </Button>
                                        )}
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

export default SignUpView;
