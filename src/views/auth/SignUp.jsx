import SignUpView from "@/components/views/auth/SignUpView.jsx";
import {Helmet} from "react-helmet-async";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
const SignUp = () => {
    return (
        <>
            <Helmet>
                <title>EasyDesign | Sign Up</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <SignUpView/>
            </Elements>
        </>
    )
}

export default SignUp;

