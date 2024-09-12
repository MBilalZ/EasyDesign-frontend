import BaseNotificationBar from "@/components/base/BaseNotificationBar.jsx";
import {Button, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {useRef} from "react";
import {toast} from "react-hot-toast";
import Div from "@/components/base/Div.jsx";

export const FontsView = () => {
    const fileInputRef = useRef(null);


    const handleUploadFont = () => {
        // Check if the file is a font file
        const file = fileInputRef.current.files[0];

        const allowedExtensions = ['ttf', 'otf', 'woff'];
        const fileExtension = file.name.split('.').pop();

        if (!allowedExtensions.includes(fileExtension)) {
            toast.error('Please upload a valid font file');
            fileInputRef.current.value = '';
            return;
        }

        // Upload the file
        const formData = new FormData();
        formData.append('font', file);
        console.log(formData);
    }
    return (
        <>
            <BaseNotificationBar largeText>
                <div>
                    <Typography variant="h2" fontSize='16px' color='#fff' fontWeight={600}>Uploaded
                        fonts<Tooltip title={
                            <>
                                If you have a font in a different format, you can convert it to any of the formats
                                listed
                                above using online tools like <a
                                href='https://www.fontsquirrel.com/tools/webfont-generator'
                                target='_blank' rel='noreferrer' style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}>Font Squirrel</a> or <a
                                href='https://transfonter.org/'
                                style={{color: '#fff', fontWeight: 'bold', textDecoration: 'underline'}} target='_blank'
                                rel='noreferrer'>Transfonter</a>.
                            </>
                        } arrow
                        >
                            <IconButton color={'inherit'}>
                                <InfoIcon/>
                            </IconButton>
                        </Tooltip></Typography>
                    <Typography variant="body1" fontSize='12px' color='#fff'>
                        If you have custom fonts not included in the system, please upload the font file in .ttf, .otf,
                        or .woff formats to personalize products.
                        formats.
                    </Typography>
                </div>
                <Button variant="white" size="small" onClick={
                    () => {
                        fileInputRef.current.click();
                    }
                }>Upload new font</Button>
                <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={handleUploadFont}/>
            </BaseNotificationBar>

            <Div sx={{
                marginBlock: '20px',
                padding: '20px',
                boxShadow: '0px 1px 12.5px 0px rgba(0, 0, 0, 0.03)'

            }}>
                {/* List of All Fonts */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Roboto
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            OpenSans
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Lato
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AbhayaLibre
                        </Typography>

                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AmaticSC
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AmaticSC-Bold
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Roboto
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            OpenSans
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Lato
                        </Typography>
                    </Grid>
                </Grid>
            </Div>


            <BaseNotificationBar>
                <div>
                    <Typography variant="h2" fontSize='16px' color='#fff' fontWeight={600} marginBottom={'5px'}>Included
                        Fonts</Typography>
                    <Typography variant="body1" fontSize='12px' color='#fff'>
                        The following fonts are included in the system and can be used to personalize products.
                    </Typography>
                </div>
            </BaseNotificationBar>

            <Div sx={{
                marginTop: '20px',
                padding: '20px',
                boxShadow: '0px 1px 12.5px 0px rgba(0, 0, 0, 0.03)'

            }}>
                {/* List of All Fonts */}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Roboto
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            OpenSans
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Lato
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AbhayaLibre
                        </Typography>

                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AmaticSC
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            AmaticSC-Bold
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Roboto
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            OpenSans
                        </Typography>
                        <Typography variant="body1" fontSize='14px' color='rgba(33, 38, 34, 0.7)'
                                    fontWeight={600}
                                    marginBottom={1}>
                            Lato
                        </Typography>
                    </Grid>
                </Grid>
            </Div>
        </>
    )
}