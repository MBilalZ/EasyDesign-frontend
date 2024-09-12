import React from "react";
import CheckoutForm from "@/components/views/auth/includes/CheckoutForm.jsx";

const SignupStepFour = ({props, errors, mediumScreen}) => {
    return (
        <>
            <CheckoutForm props={props} errors={errors} touched={props.touched} mediumScreen={{mediumScreen}}/>
        </>
    )
}

export default SignupStepFour;
