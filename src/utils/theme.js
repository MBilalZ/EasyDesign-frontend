// Create mui theme with custom colors
// https://material-ui.com/customization/default-theme/

import {createTheme, lighten} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#29AB51",
        },
        secondary: {
            main: "#f50057",
        },
        grey: {
            main: "#383838",
            light: "#38383833",
        },
        white: {
            main: "#fff"
        },
        dark: {
            main: '#313131'
        },
    },

    spacing: 8,
    typography: {
        fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
        body1: {
            fontSize: '15px',
        },
        htmlFontSize: 16,
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'contained', color: 'primary'},
                    style: {
                        color: 'white',
                    }
                },
                {
                    props: {variant: 'outlined', color: 'white'},
                    style: {
                        color: 'white',
                        border: '1.3px solid #fff',
                        '&:hover': {
                            borderColor: '#38383833',
                        },
                    }
                },
                // Create a variant named `outlinedTransparent` that extends the `outlined` variant
                {
                    props: {variant: 'outlinedTransparent'},
                    style: {
                        color: 'black',
                        border: '1.3px solid #38383833',
                        '&:hover': {
                            borderColor: '#38383833',
                        },
                    },

                },

                {
                    props: {variant: 'white'},
                    style: {
                        backgroundColor: 'white',
                        color: 'rgba(33, 45, 37, 1)',
                        '&:hover': {
                            backgroundColor: lighten('#fff', 0.5),
                        },
                    }
                },
                {
                    props: {size: 'medium'},
                    style: {
                        padding: '9px 21px',
                        fontSize: '15px',
                        minWidth: '120px',
                    }
                },
                {
                    props: {size: 'large'},
                    style: {
                        padding: '12px 24px',
                    }
                },
                {
                    props: {size: 'extra-small'},
                    style: {
                        padding: '6px 12px',
                        fontSize: '12px',
                        minWidth: '77px',
                    }
                },
                {
                    props: {size: 'inlined'},
                    style: {
                        padding: '5px 21px',
                        fontSize: '15px',
                        minWidth: '120px',
                    }
                }
            ],
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    textTransform: 'capitalize',
                    "&:hover": {
                        boxShadow: 'none',
                    },
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderColor: '#38383833',
                },
                input: {
                    padding: '17px 14px',
                    borderColor: '#38383833',
                    fontSize: '15px',
                }
            },
        },
    },
});

export default theme;
