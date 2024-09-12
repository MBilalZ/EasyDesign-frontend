import {Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AppLogo = () => {
    return (
        <Link to="/auth/login" className={'app-logo'}>
            <img src="/images/logo.svg" alt="logo"/>
            <div className={"authContainer__left--logoText"}>
                <Typography
                    variant={"body1"}
                    fontSize={22.32}
                    fontWeight={"800"}
                    lineHeight={1}
                    color={"white"}
                    textAlign={"left"}
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
    )
}

export default AppLogo;