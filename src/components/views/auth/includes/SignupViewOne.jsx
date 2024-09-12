import {ErrorMessage, Field} from "formik";
import {Checkbox, CircularProgress, FormHelperText, TextField, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {Link} from "react-router-dom";

const FormViewOne = ({props, loading, validateEmailOnBlur}) => {
    return (
        <>
            <Field
                as={TextField}
                label="First Name"
                type="text"
                name="firstName"
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="dense"
                helperText={props.touched.firstName && props.errors.firstName ? <ErrorMessage name="firstName"/> : ''}
                error={props.touched.firstName && Boolean(props.errors.firstName)}
                inputProps={{
                    autoComplete: 'new-password',
                    form: {
                        autoComplete: 'off',
                    },
                }}
            />

            <Field
                as={TextField}
                label="Last Name"
                type="text"
                name="lastName"
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="dense"
                helperText={props.touched.lastName && props.errors.lastName ? <ErrorMessage name="lastName"/> : ''}
                error={props.touched.lastName && Boolean(props.errors.lastName)}
            />

            <Field
                as={TextField}
                label="Email"
                type="text"
                name="email"
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="dense"
                helperText={props.touched.email && props.errors.email ? <ErrorMessage name="email"/> : ''}
                error={props.touched.email && Boolean(props.errors.email)}
                InputProps={{
                    endAdornment: loading ? <CircularProgress size={20}/> : null,
                }}
                onBlur={(e) => {
                    props.handleBlur(e);
                    validateEmailOnBlur(e.target.value, props.setFieldError);
                }}
            />

            <Stack direction="row" spacing={2} alignItems={"center"}>
                <Field
                    as={Checkbox}
                    type="checkbox"
                    name="terms"
                    error={props.touched.terms && Boolean(props.errors.terms)}
                    id={"terms"}
                />
                <Typography style={{marginLeft: 0}} variant={'body2'} component={'label'} htmlFor={"terms"}>
                    I’ve read the <Link to={'/auth/login'}>Privacy Policy</Link> and the <Link to={'/auth/login'}>Terms
                    of Services</Link>
                </Typography>
            </Stack>
            <FormHelperText error style={{marginLeft: 11}}>
                <ErrorMessage name="terms"/>
            </FormHelperText>
        </>
    );
};

export default FormViewOne;
