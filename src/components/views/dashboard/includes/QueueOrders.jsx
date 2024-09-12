import React from 'react';
import Div from "@/components/base/Div.jsx";
import {Stack} from "@mui/system";
import {EyeSVG} from "@/assets";
import {Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const listData = [
    {
        title: 'Queue Orders',
        value: '05',
        percentage: '+12%',
        bgColor: '#F5C160'
    },
    {
        title: 'Total customers',
        value: '1365',
        percentage: '+12%',
        bgColor: '#FA8CB0'
    },
    {
        title: 'Revenue',
        value: '1365',
        percentage: '+12%',
        bgColor: '#71DAF8'
    }
]

const QueueOrders = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={'column'} justifyContent={'space-between'} height={'100%'}
               gap={1} {...props}>
            {
                listData.map((item, index) => {
                    return (
                        <Div sx={{padding: 2}} key={index}>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                key={index}
                            >
                                <Stack direction={'row'} gap={2}
                                       alignItems={'center'}>
                                    <Stack justifyContent={'center'} alignItems={'center'}
                                           sx={{
                                               background: item.bgColor,
                                               width: 50,
                                               height: 50,
                                               borderRadius: 1,
                                               color: '#fff',
                                               boxShadow: '0px 1px 12.5px 0px #00000008'
                                           }}>
                                        <EyeSVG color={'inherit'}/>
                                    </Stack>
                                    <Div>
                                        <Typography variant={'body2'} fontSize={14} fontWeight={500} color={
                                            theme.palette.mode === 'dark' ? '#ffffffa1'
                                                : '#38383899'
                                        }>
                                            {item.title}
                                        </Typography>
                                        <Typography variant={'body2'} fontSize={24} fontWeight={600} color={
                                            theme.palette.mode === 'dark' ? '#ffffff'
                                                : '#202020'
                                        }>
                                            {item.value}
                                        </Typography>
                                    </Div>
                                </Stack>
                                <Typography
                                    variant={'body2'}
                                    fontSize={24}
                                    fontWeight={500}
                                    color={item.bgColor}
                                >
                                    {item.percentage}
                                </Typography>
                            </Stack>
                        </Div>
                    )
                })
            }
        </Stack>
    );
};

export default QueueOrders;