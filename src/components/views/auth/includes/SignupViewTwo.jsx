import {ErrorMessage, Field} from "formik";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOff from "@mui/icons-material/VisibilityOff.js";

const FormViewTwo = ({props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <Field
                as={TextField}
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
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
                inputProps={{
                    autoComplete: 'new-password',
                    form: {
                        autoComplete: 'off',
                    },
                }}
            />

            <Field
                as={TextField}
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="off"
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
            />
        </>
    )
}

export default FormViewTwo;