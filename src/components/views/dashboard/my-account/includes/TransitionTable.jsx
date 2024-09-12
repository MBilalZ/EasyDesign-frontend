import {Chip, Typography} from "@mui/material";
import Div from "@/components/base/Div.jsx";
import {Stack} from "@mui/system";
import React, {useState} from "react";
import BaseDataTable from "@/components/base/BaseDataTable.jsx";


const CustomPaymentCard = ({paymentMethod}) => {
    return (
        <Stack direction={'row'} alignItems={'center'} columnGap={1}>
            <img src={paymentMethod.icon} alt={'paymentMethod'}/>
            <Typography variant={'body2'} fontSize={14} color={'#383838'} fontWeight={600}>
                {paymentMethod.name} {paymentMethod.number}
            </Typography>
        </Stack>
    );

}
const TransitionTable = () => {
    const [transitionType, setTransitionType] = useState('card');
    const data = [
        {
            "Payment Method": <CustomPaymentCard paymentMethod={{
                name: 'visa',
                icon: '/images/icons/visa-card.png',
                number: '**** 1234'
            }}/>,
            "Date": "12/12/2021",
            "Amount": "$100 USD",
            "Status": <Chip label="Success" color="success" size="medium"/>,
        },
        {
            "Payment Method": <CustomPaymentCard paymentMethod={{
                name: 'mastercard',
                icon: '/images/icons/master-card.png',
                number: '**** 1234'
            }}/>,
            "Date": "12/12/2021",
            "Amount": "$100 USD",
            "Status": <Chip label="Success" color="success" size="medium"/>,
        },
        {
            "Payment Method": <CustomPaymentCard paymentMethod={{
                name: 'visa',
                icon: '/images/icons/visa-card.png',
                number: '**** 1234'
            }}/>,
            "Date": "12/12/2021",
            "Amount": "$100 USD",
            "Status": <Chip label="Cancel" color="error" size="medium"/>,
        }];

    const columns = [
        {name: "Payment Method", options: {sort: false}},
        {name: "Date", options: {sort: false}},
        {name: "Amount", options: {sort: false}},
        {name: "Status", options: {sort: false}},
    ];

    const options = {
        search: false,
        textLabels: {
            body: {
                noMatch: "No records found",
            },
        },
        
    };
    const handleChange = (event) => {
        setTransitionType(event.target.value);
    };
    return (
        <>
            <Typography variant={'h1'} fontSize={'22px'} fontWeight={'600'}>Transactions</Typography>
            <Typography variant={'body1'} fontSize={'14px'} color={'rgba(56, 56, 56, 0.8)'} marginTop={1}
                        marginBottom={2}>
                Get the process started in less than 05 minutes. Let<br/> us handle the rest.
            </Typography>

            <Div sx={{py: 3, px: 3}}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant={'h2'} fontSize={'18px'} fontWeight={'600'}>Transaction history</Typography>
                    {/*<FormControl>*/}
                    {/*    <FormLabel id="demo-controlled-radio-buttons-group">*/}
                    {/*        Transaction type*/}
                    {/*    </FormLabel>*/}
                    {/*    <RadioGroup*/}
                    {/*        aria-labelledby="demo-controlled-radio-buttons-group"*/}
                    {/*        name="controlled-radio-buttons-group"*/}
                    {/*        value={transitionType}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        row*/}
                    {/*    >*/}
                    {/*        <FormControlLabel value="card" control={<Radio/>} label="Card"/>*/}
                    {/*        <FormControlLabel value="wallet" control={<Radio/>} label="Wallet"/>*/}
                    {/*    </RadioGroup>*/}
                    {/*</FormControl>*/}
                </Stack>

                <div style={{marginTop: '20px'}}>
                    <BaseDataTable options={options} data={data} columns={columns}/>
                </div>
            </Div>
        </>
    )
}

export default TransitionTable;
