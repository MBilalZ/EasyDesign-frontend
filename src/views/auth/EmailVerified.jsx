import React, {useEffect} from 'react';
import {Stack} from "@mui/system";
import {Button, Card, Typography} from "@mui/material";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import {useNavigate} from "react-router-dom";

const EmailVerified = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("verify-email")) {
            navigate("/auth/login");
        }
    }, []);

    const handleContinue = () => {
        localStorage.removeItem("verify-email");
        navigate("/auth/login");
    }
    return (
        <Stack sx={{width: '100%', height: '100vh'}} justifyContent={'center'} alignItems={'center'}>
            <Card sx={{padding: 4, textAlign: 'center', width: '100%', maxWidth: 400}}>
                <div style={{fontSize: 50, lineHeight: 0, marginBottom: '23px'}}>
                    <VerifiedRoundedIcon fontSize={'inherit'} color={'primary'}/>
                </div>
                <Typography variant={'h5'} fontWeight={'bold'} fontSize={'22px'} marginBottom={1}>Email
                    Verified</Typography>
                <Typography variant={'body1'} fontSize={'14px'} maxWidth={'300px'} color={'#383838CC'}
                            marginInline={'auto'} marginBottom={3}>Your email has been
                    verified successfully.</Typography>

                <Button variant={'contained'} onClick={handleContinue} color={'primary'} fullWidth>
                    Continue
                </Button>
            </Card>
        </Stack>
    );
};

export default EmailVerified;