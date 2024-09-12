// src/NotFoundPage.js
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
    maxWidth: 600,
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
    fontSize: '12rem',
    color: '#e57373',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0.1,
}));

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Navigates to the home page
    };

    return (
        <Container>
            <ContentBox>
                <Illustration>🌐</Illustration> {/* Replace with your custom illustration or SVG */}
                <Typography
                    variant="h1"
                    component="div"
                    gutterBottom
                    sx={{fontSize: '6rem', fontWeight: 'bold', color: '#333'}}
                >
                    404
                </Typography>
                <Typography variant="h5" component="div" gutterBottom sx={{mb: 2}}>
                    Whoops! Page Not Found
                </Typography>
                <Typography variant="body1" component="div" gutterBottom sx={{mb: 4}}>
                    We can’t seem to find the page you’re looking for. It may have been moved or deleted.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGoHome}
                    sx={{textTransform: 'none'}}
                >
                    Return to Home
                </Button>
            </ContentBox>
        </Container>
    );
};

export default NotFoundPage;
