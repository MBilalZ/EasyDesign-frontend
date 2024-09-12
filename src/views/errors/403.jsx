// src/ForbiddenPage.js
import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';

const Container = styled(Box)(({theme}) => ({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
}));

const ContentBox = styled(Box)(({theme}) => ({
    maxWidth: 500,
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[10],
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
}));

const Illustration = styled('div')(({theme}) => ({
    fontSize: '10rem',
    color: '#f44336',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0.2,
}));

const ForbiddenPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/dashboard'); // Navigates back to the previous page
    };

    return (
        <Container>
            <ContentBox>
                <Illustration>🔒</Illustration> {/* Replace with your custom illustration or SVG */}
                <Typography
                    variant="h1"
                    component="div"
                    gutterBottom
                    sx={{fontSize: '6rem', fontWeight: 'bold', color: '#f44336'}}
                >
                    403
                </Typography>
                <Typography variant="h5" component="div" gutterBottom sx={{mb: 2}}>
                    Forbidden
                </Typography>
                <Typography variant="body1" component="div" gutterBottom sx={{mb: 4}}>
                    You don’t have permission to access this page. Please contact support if you believe this is a
                    mistake.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGoBack}
                    sx={{textTransform: 'none'}}
                >
                    Go Back
                </Button>
            </ContentBox>
        </Container>
    );
};

export default ForbiddenPage;
