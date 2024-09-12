import React from 'react';
import Div from "@/components/base/Div.jsx";
import {Typography} from "@mui/material";
import {Stack} from "@mui/system";

const productData = [
    {
        title: 'T-shirt',
        orders: 100,
        revenue: '1,537',
        picture: '/images/icons/cup.svg',
    },
    {
        title: 'Shoes',
        orders: 50,
        revenue: 1000,
        picture: '/images/icons/cup.svg',
    },
    {
        title: 'Jeans',
        orders: 30,
        revenue: 600,
        picture: '/images/icons/cup.svg',
    },
];
const TopSellingProduct = (props) => {
    return (
        <Div {...props}>
            <Typography
                variant={'body2'}
                fontWeight={600}
                fontSize={18}
                color={'#383838'}
                marginBottom={2}
            >
                Top selling products
            </Typography>

            <Div sx={{mt: 2, background: 'transparent'}}>
                <Stack
                    direction={'column'}
                    gap={2}
                >
                    {
                        productData.map((item, index) => {
                            return (
                                <Stack key={index} direction={'row'} justifyContent={'space-between'} gap={1}>
                                    <Stack direction={'row'} gap={2}>
                                        <Stack justifyContent={'center'} alignItems={'center'}
                                               style={{
                                                   width: 48,
                                                   height: 48,
                                                   background: '#202020',
                                                   padding: '5px',
                                                   boxSizing: 'border-box',
                                                   borderRadius: 8,
                                               }}>
                                            <img src={item.picture} alt={item.title} style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                            }}/>
                                        </Stack>
                                        <div>
                                            <Typography
                                                variant={'body2'}
                                                fontSize={14}
                                                fontWeight={400}
                                                color={'#383838'}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant={'body2'}
                                                fontSize={16}
                                                fontWeight={600}
                                                color={'#383838'}
                                            >
                                                {item.orders}
                                            </Typography>
                                        </div>
                                    </Stack>
                                    <Typography
                                        variant={'body2'}
                                        fontSize={14}
                                        fontWeight={400}
                                        color={'#383838'}
                                    >
                                        Revenue: <span
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            color: '#29AB51'
                                        }}>${item.revenue}</span>
                                    </Typography>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Div>
        </Div>
    );
};

export default TopSellingProduct;