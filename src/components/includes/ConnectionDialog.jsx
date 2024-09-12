import * as React from 'react';
import {useCallback, useMemo} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {Grid, IconButton, Stack, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
import {handleConnection} from "@/services/connections/index.js";

const selectConnectionsList = (state) => state.connectionsList;

const SignUpText = ({link}) => {
    return (
        <Typography variant={'body2'} component={'div'}
                    fontWeight={400} color={'#202020CC'} fontSize={12}>
            Don’t have account? <Typography variant={'body2'} component={'a'}
                                            href={link}
                                            fontSize={12}
                                            fontWeight={500}
                                            color={'primary'}>Sign Up</Typography>
        </Typography>
    )
};

function ConnectionDialog({openDialog, setOpenDialog}) {
    const connectionsList = useSelector(selectConnectionsList);

    const handleClose = useCallback(() => {
        setOpenDialog(false);
    }, [setOpenDialog]);

    const renderConnection = useCallback((connection) => (
        <Grid item xs={12} md={6} key={connection.name}>
            <Stack direction={'row'} gap={1} justifyContent={'space-between'} alignItems={'center'}>
                <Stack direction={'row'} gap={1.2}>
                    <div className={'icons-list'}>
                        <img src={connection.logo} alt={connection.name} className={'responsive-image'}/>
                    </div>
                    <div>
                        <Typography variant={'body2'} component={'p'} fontSize={14}
                                    fontWeight={'600'} color={'#202020'}>
                            {connection.name}
                        </Typography>
                        <SignUpText link={connection?.signUpLink}/>
                    </div>
                </Stack>
                <Button variant={'contained'} color={'primary'} size={'extra-small'}
                        onClick={() => handleConnection(connection.name.toLowerCase())}>
                    Connect
                </Button>
            </Stack>
        </Grid>
    ), []);

    const marketPlaces = useMemo(() => connectionsList.marketPlaces, [connectionsList.marketPlaces]);
    const printProviders = useMemo(() => connectionsList.printProviders, [connectionsList.printProviders]);

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                maxWidth={'md'}
                open={openDialog}
                onClose={handleClose}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                    >
                        <Typography variant={'h6'} fontSize={18} fontWeight={600}>Marketplace</Typography>
                        <Grid container columnSpacing={5} rowGap={{md: 0, xs: 2}} mt={3}>
                            {marketPlaces.map(renderConnection)}
                        </Grid>
                        <Typography variant={'h6'} fontSize={18} fontWeight={600} mt={4}>Print Providers</Typography>
                        <Grid container columnSpacing={5} rowGap={{md: 0, xs: 2}} mt={3}>
                            {printProviders.map(renderConnection)}
                        </Grid>


                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default ConnectionDialog;
