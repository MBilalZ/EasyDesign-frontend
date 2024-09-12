import * as yup from "yup";
import {globalRegex, globalValidation} from "./globalValidation";
/*
  Validation Schemas  
*/
const FirstFromValidation = yup.object().shape({
    name: yup
        .string()
        .min(3, "Name Should be minimum 3 character")
        .max(30, "Name Should be maximum 30 character")
        .required("Required !"),

    email: yup.string().email("Enter a Vaid Email").required("Email is Required"),

    password: yup
        .string()
        .required("Enter Your Password")
        .matches(globalRegex.password, "Uppercase Lowercase Special char Required")
        .min(8, "Password Should be minimum 8 character")
        .max(50, "Too long"),

    phoneNumber: yup
        .string()
        .matches(globalRegex.phoneNumber, "Invalid Phone Number")
        .max(11, "Invalid Phone Number")
        .required("Required !"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not matched")
        .required("Confirm Password is Required"),

    image: yup
        .mixed()
        .required("File is Required")
        .test(
            "fileSize",
            "File more than 0.5 MB not Allowed",
            (value) => value && value.size <= globalValidation.fileSize
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            (value) => value && globalValidation.filesFormat.includes(value.type)
        ),

    sports: yup
        .array()
        .min(1, "Select at least 1 option")
        .max(2, "Select only 2 options")
        .required("Required"),
    gender: yup.string().required("Select a Option"),
    // website: yup.string().url().required("Website is Required"),

    select: yup.string().required("Select a Option"),
});

const LoginFormValidation = yup.object().shape({
    email: yup.string().email("Enter a Valid Email").required("Enter Your Email"),
    password: yup.string().required("Enter Your Password"),
});

const validationSchemaStepOne = yup.object({
    firstName: yup
        .string()
        .max(30, "First Name Should be maximum 30 character")
        .required("Enter Your First Name"),
    lastName: yup
        .string()
        .max(30, "Last Name Should be maximum 30 character")
        .required("Enter Your Last Name"),
    email: yup.string().email("Enter a Valid Email").required("Email is Required"),
    terms: yup.boolean().oneOf([true], "Accept Terms & Conditions is Required"),
});

const validationSchemaStepTwo = yup.object({
    password: yup
        .string()
        .required("Enter Your Password")
        .matches(globalRegex.password, "Uppercase Lowercase Special char Required")
        .min(8, "Password Should be minimum 8 character")
        .max(50, "Too long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not matched")
        .required("Confirm Password is Required"),
});

const validationSchemaStepThree = yup.object({
    plan: yup.string().required("Select a Plan"),
});

const validationSchemaStepFour = yup.object({
    country: yup.string().required('Country is required'),
    zipcode: yup.string().required('Zipcode is required'),
    promoCode: yup.string()
});

const registerFormValidation = [validationSchemaStepOne, validationSchemaStepTwo, validationSchemaStepThree, validationSchemaStepFour];

const forgotPasswordValidation = yup.object().shape({
    email: yup.string().email("Enter a Valid Email").required("Enter Your Required"),
});

const setPasswordValidation = yup.object().shape({
    password: yup
        .string()
        .required("Enter Your Password")
        .matches(globalRegex.password, "Uppercase Lowercase Special char Required")
        .min(8, "Password Should be minimum 8 character")
        .max(50, "Too long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not matched")
        .required("Confirm Password is Required"),
});


// My Account
const imageValidation = yup
    .mixed()
    .required("File is Required")
    .test(
        "fileSize",
        "File more than 0.5 MB not Allowed",
        (value) => value && value.size <= globalValidation.fileSize
    )
    .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && globalValidation.filesFormat.includes(value.type)
    );
const profileValidation = yup.object().shape({
    firstName: yup
        .string()
        .min(3, "Name Should be minimum 3 character")
        .max(30, "Name Should be maximum 30 character"),
    lastName: yup
        .string()
        .min(3, "Name Should be minimum 3 character")
        .max(30, "Name Should be maximum 30 character"),
    email: yup.string().email("Enter a Vaid Email"),
    phoneNo: yup
        .string()
        .matches(globalRegex.phoneNumber, "Invalid Phone Number")
});

const changePasswordValidation = yup.object().shape({
    oldPassword: yup.string().required("Old Password is Required"),
    password: yup
        .string()
        .required("Password is Required")
        .matches(globalRegex.password, "Uppercase Lowercase Special char Required")
        .min(8, "Password Should be minimum 8 character")
        .max(50, "Too long"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not matched")
        .required("Confirm Password is Required"),
});


const addCardValidation = yup.object().shape({
    name: yup.string().required("Name is Required"),
    country: yup.string().required("Country is Required"),
    zipcode: yup.string().required("Zipcode is Required"),
});
export {
    FirstFromValidation,
    LoginFormValidation,
    forgotPasswordValidation,
    registerFormValidation,
    setPasswordValidation,
    imageValidation,
    profileValidation,
    changePasswordValidation,
    addCardValidation
};
