import {
    Box,
    Button,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import Div from "@/components/base/Div.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from '@stripe/react-stripe-js';
import CreditCardIcon from "@mui/icons-material/CreditCard.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addCardValidation} from "@/utils/index.js";
import ReactCountryFlagsSelect from "react-country-flags-select";
import {toast} from "react-hot-toast";

const CardsWallet = () => {
    const {user} = useAuth();
    const theme = useTheme();
    const elements = useElements();
    const stripe = useStripe();
    const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
    const formikRef = useRef(null);
    const addCardInitialValues = {
        name: '',
        country: '',
        zipcode: '',
    };
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [openAddCard, setOpenAddCard] = useState(false);
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardExpiryError, setCardExpiryError] = useState('');
    const [cardCvcError, setCardCvcError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const handleStripeError = (event, setError) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError('');
        }
    };

    useEffect(() => {
        if (selectedCountry) {
            formikRef.current?.setFieldValue('country', selectedCountry?.countryCode || '');
        } else {
            formikRef.current?.setFieldValue('country', '');
        }
    }, [selectedCountry]);


    const validateStripeElements = async () => {
        if (!elements) {
            console.error('Stripe elements not found');
            return false;
        }

        const cardNumber = elements.getElement(CardNumberElement);
        const cardExpiry = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);

        if (!cardNumber || !cardExpiry || !cardCvc) {
            setCardNumberError(cardNumber ? '' : 'Card Number is required');
            setCardExpiryError(cardExpiry ? '' : 'Card Expiry is required');
            setCardCvcError(cardCvc ? '' : 'Card CVC is required');
            return false;
        }

        const cardNumberValid = cardNumber._complete;
        const cardExpiryValid = cardExpiry._complete;
        const cardCvcValid = cardCvc._complete;

        if (!cardNumber._complete) {
            setCardNumberError(cardNumber._empty ? 'Your card number is incomplete.' : 'Invalid Card Number');
        } else {
            setCardNumberError('');
        }

        if (!cardExpiry._complete) {
            setCardExpiryError(cardExpiry._empty ? 'Your card\'s expiration date is incomplete.' : 'Invalid Expiry Date');
        } else {
            setCardExpiryError('');
        }

        if (!cardCvc._complete) {
            setCardCvcError(cardCvc._empty ? 'Your card\'s security code is incomplete.' : 'Invalid CVC');
        } else {
            setCardCvcError('');
        }

        return cardNumberValid && cardExpiryValid && cardCvcValid;
    };


    const handleAddCardStripe = async () => new Promise((resolve, reject) => {
        if (!stripe) {
            console.error('Stripe not found');
            reject();
        }

        stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name: formikRef.current?.values.name,
                address: {
                    country: formikRef.current?.values.country,
                    postal_code: formikRef.current?.values.zipcode,
                }
            },

        }).then((result) => {
            if (result.error) {
                reject(result.error);
            } else {
                resolve(result.paymentMethod);
            }
        }).catch((error) => {
            reject(error);
        })
    });
    const handleAddCard = (values) => {
        formikRef.current?.setTouched({
            name: true,
            country: true,
            zipcode: true,
        });

        // Validate form
        formikRef.current?.validateForm().then((errors) => {
            if (Object.keys(errors).length) {
                return;
            }
            validateStripeElements().then((valid) => {
                if (valid) {
                    // Add card to stripe
                    handleAddCardStripe().then((paymentMethod) => {
                        console.log('Card added successfully', paymentMethod);
                        handleAddCardClose();
                    }).catch((error) => {
                        toast.error(error?.message)
                    });
                }
            });
        })
    };

    const handleAddCardClose = () => {
        setOpenAddCard(false);
        setCardNumberError('');
        setCardExpiryError('');
        setCardCvcError('');
        setSelectedCountry(null);
    }

    const handleAddCardOpen = () => {
        setOpenAddCard(true);
    }
    const cards = [{
        id: 1,
        pmLastFour: '1234',
        pmType: 'visa',
        expiryDate: '12/22',
        isDefault: true
    }, {
        id: 2,
        pmLastFour: '5678',
        pmType: 'mastercard',
        expiryDate: '12/22',
        isDefault: false
    }];

    const [defaultCard, setDefaultCard] = React.useState(1);

    const handleChangeCard = (cardNumber) => {
        setDefaultCard(cardNumber);
    }
    return (
        <>
            <Typography variant={'h1'} fontSize={'22px'} fontWeight={'600'}>Cards & Wallet</Typography>
            <Typography variant={'body1'} fontSize={'14px'} color={'rgba(56, 56, 56, 0.8)'}
                        marginTop={1} marginBottom={2}>
                Add or remove cards and payment methods to your account.
            </Typography>
            <Div sx={{p: 3}}>
                <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
                    <Button variant={'contained'} size={'medium'} onClick={handleAddCardOpen}>Add Card</Button>
                    <Button variant={'outlinedTransparent'}>Add Funds</Button>
                </Stack>
                <Divider sx={{marginTop: 4, marginBottom: 4}}/>

                <RadioGroup
                    name="cards"
                    value={defaultCard}
                    className={'card__item'}
                >
                    {cards.map((card, index) => (
                        <FormControlLabel
                            key={index}
                            value={card.id}
                            control={<Radio/>}
                            label={
                                <Stack direction={
                                    smallScreen ? 'column-reverse' : 'row'
                                } alignItems={
                                    smallScreen ? 'flex-start' : 'center'
                                } justifyContent={'space-between'} gap={2}>
                                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                                        {
                                            card.pmType === 'visa' ? (
                                                <img src="/images/icons/visa-large.svg" alt="visa-card"/>
                                            ) : (
                                                <img src="/images/icons/master-card-large.svg" alt="mastercard"/>
                                            )
                                        }
                                        <div>
                                            <Typography
                                                variant={'h6'}
                                                fontSize={'14px'}>{card.pmType.toLowerCase()} **** {card.pmLastFour}</Typography>
                                            <Typography
                                                variant={'body1'}
                                                fontSize={'12px'}
                                                color={'rgba(32, 32, 32, 1)'}>Expires {card.expiryDate}</Typography>
                                            <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                                                <PermIdentityOutlinedIcon fontSize={'small'}
                                                                          color={'rgba(32, 32, 32, 0.8)'}/>
                                                <Typography
                                                    variant={'span'}
                                                    fontSize={'12px'}
                                                    color={'rgba(32, 32, 32, 0.8)'}>
                                                    {user?.firstName} {user?.lastName}
                                                </Typography>
                                            </Stack>
                                        </div>
                                    </Stack>
                                    <Stack sx={{
                                        position: smallScreen ? 'absolute' : 'static',
                                        top: '5px',
                                        right: '5px'
                                    }} direction={'row'} alignItems={'center'}>
                                        {
                                            card.isDefault ? (
                                                <Typography variant={'span'} fontSize={'12px'}
                                                            color={'rgba(32, 32, 32, 0.8)'}

                                                            sx={{
                                                                background: 'var(--primary)',
                                                                color: '#fff',
                                                                borderRadius: '4px',
                                                                padding: '2px 6px',
                                                            }}>
                                                    Default
                                                </Typography>
                                            ) : (
                                                <Button variant={'text'} size={'small'}
                                                        onClick={() => handleChangeCard(card.id)}>Set Default</Button>
                                            )
                                        }
                                        <IconButton color={'error'}>
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            }
                        />
                    ))}
                </RadioGroup>

                <Dialog open={openAddCard} className={'card-add-dialog'} scroll={'body'} onClose={handleAddCardClose}
                        maxWidth={'xs'} fullWidth>
                    <Box sx={{padding: '30px 15px', width: '100%'}}>
                        <div style={{textAlign: 'center'}}>
                            <img src={'/images/icons/lock-card.png'} alt={'lock-card'}/>
                        </div>
                        <DialogTitle textAlign={'center'} sx={{paddingTop: 0}}>
                            <Typography variant={'h6'} fontSize={22} fontWeight={600}>
                                Add new card
                            </Typography>
                            <Typography variant={'body1'} fontSize={14} color={'rgba(56, 56, 56, 0.8)'} marginTop={1}>
                                Securely add your card details to your account.
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={addCardInitialValues}
                                validationSchema={addCardValidation}
                                innerRef={formikRef}
                                onSubmit={handleAddCard}
                            >
                                {(props) => {
                                    return (
                                        <Form noValidate>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Field
                                                        as={TextField}
                                                        label="Name on Card"
                                                        type="text"
                                                        name="name"
                                                        required
                                                        autoComplete="off"
                                                        fullWidth
                                                        variant="outlined"
                                                        margin="dense"
                                                        helperText={props.touched.name && props.errors.name ?
                                                            <ErrorMessage name="name"/> : ''}
                                                        error={props.touched.name && Boolean(props.errors.name)}
                                                        inputProps={{
                                                            autoComplete: 'new-password',
                                                            form: {
                                                                autoComplete: 'off',
                                                            },
                                                        }}
                                                    />
                                                </Grid>
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
                                                        <CreditCardIcon
                                                            className={`icon ${cardNumberError && 'error'}`}/>
                                                    </div>

                                                    {cardNumberError && <p className="error">{cardNumberError}</p>}
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <CardExpiryElement
                                                        className={`stripe-input ${cardExpiryError && 'error'} no-space`}
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
                                                <Grid item md={6} xs={12}>
                                                    <CardCvcElement
                                                        className={`stripe-input ${cardCvcError && 'error'} no-space`}
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
                                                <Grid item md={6} xs={12} className={'custom-country'}>
                                                    <div
                                                        className={props.errors.country && props.touched.country && 'country-error'}>
                                                        <ReactCountryFlagsSelect
                                                            selected={selectedCountry}
                                                            selectHeight={54}
                                                            searchPlaceholder={'Country *'}
                                                            onSelect={setSelectedCountry}
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
                                                        style={{marginTop: '0px'}}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Divider sx={{my: 1.2}}/>
                                            </Grid>
                                            <Grid item xs={12}
                                                  sx={{
                                                      textAlign: 'right',
                                                      display: 'flex',
                                                      justifyContent: 'flex-end',
                                                      gap: '12px',
                                                      flexWrap: 'wrap',
                                                      flexDirection: {
                                                          xs: 'column',
                                                          md: 'row'
                                                      }
                                                  }}>
                                                <Button variant={'contained'} color={'primary'} type={'button'}
                                                        onClick={handleAddCard}>
                                                    Add Card
                                                </Button>
                                                <Button variant={'outlinedTransparent'} sx={{fontWeight: 'normal'}}
                                                        color={'primary'}
                                                        onClick={
                                                            handleAddCardClose
                                                        } type={'button'}>
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Form>
                                    )
                                }}

                            </Formik>
                        </DialogContent>
                    </Box>
                </Dialog>
            </Div>
        </>
    )
}


export default CardsWallet;
