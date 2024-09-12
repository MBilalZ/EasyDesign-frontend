import React, {useEffect, useState} from 'react';
import {CardCvcElement, CardExpiryElement, CardNumberElement} from '@stripe/react-stripe-js';
import {Box, Grid, TextField} from '@mui/material';
import {ErrorMessage, Field} from 'formik';
import ReactCountryFlagsSelect from "react-country-flags-select";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const CheckoutForm = ({props, errors}) => {
    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selected, setSelected] = useState(null);
    // Stripe element error states
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardExpiryError, setCardExpiryError] = useState('');
    const [cardCvcError, setCardCvcError] = useState('');

    const handleStripeError = (event, setError) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError('');
        }
    };

    useEffect(() => {
        if (selected) {
            props.setFieldValue('country', selected?.countryCode || '');
        } else {
            props.setFieldValue('country', '');
        }
    }, [selected]);

    return (
        <Box>
            <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="promoCode"
                label="Promo Code"
                name="promoCode"
                helperText={<ErrorMessage name="promoCode"/>}
                error={props.errors.promoCode && props.touched.promoCode}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={'icon-input'}>
                        <CardNumberElement
                            className={`stripe-input ${cardNumberError && 'error'}`}
                            options={{
                                style: {
                                    base: {
                                        color: '#424770',
                                        '::placeholder': {
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                            onChange={(event) => handleStripeError(event, setCardNumberError)}
                        />
                        <CreditCardIcon className={`icon ${cardNumberError && 'error'}`}/>
                    </div>

                    {cardNumberError && <p className="error">{cardNumberError}</p>}
                </Grid>
                <Grid item xs={6}>
                    <CardExpiryElement
                        className={`stripe-input no-space ${cardExpiryError && 'error'}`}
                        options={{
                            style: {
                                base: {
                                    color: '#424770',
                                    '::placeholder': {
                                        color: 'rgba(0, 0, 0, 0.6)',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        onChange={(event) => handleStripeError(event, setCardExpiryError)}
                    />
                    {cardExpiryError && <p className="error">{cardExpiryError}</p>}
                </Grid>
                <Grid item xs={6}>
                    <CardCvcElement
                        className={`stripe-input no-space ${cardCvcError && 'error'}`}
                        options={{
                            style: {
                                base: {
                                    color: '#424770',
                                    '::placeholder': {
                                        color: 'rgba(0, 0, 0, 0.6)',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        onChange={(event) => handleStripeError(event, setCardCvcError)}
                    />
                    {cardCvcError && <p className="error">{cardCvcError}</p>}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <div className={props.errors.country && props.touched.country && 'country-error'}>
                        <ReactCountryFlagsSelect
                            selected={selected}
                            selectHeight={54}
                            searchPlaceholder={'Country *'}
                            onSelect={setSelected}
                            fullWidth
                            searchable
                        />
                    </div>
                    {props.errors.country && props.touched.country && (
                        <p className="error">
                            {props.errors.country}
                        </p>
                    )}
                </Grid>
                <Grid item md={6} xs={12}>
                    <Field
                        as={TextField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="zipcode"
                        label="Zip Code"
                        name="zipcode"
                        helperText={<ErrorMessage name="zipcode"/>}
                        error={props.errors.zipcode && props.touched.zipcode}
                        style={mediumScreen ? {marginTop: '5px'} : {marginTop: '16px'}}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutForm;
