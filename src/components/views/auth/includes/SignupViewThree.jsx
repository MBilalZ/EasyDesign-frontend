import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SignUpViewThree = ({props, plans}) => {
    const {plan} = props.values;
    return (
        <>
            <div className="planContainer">
                <RadioGroup
                    name="plan"
                    value={plan}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                >
                    {plans.map((plan, index) => (
                        <FormControlLabel
                            key={index}
                            value={plan.id}
                            control={<Radio/>}
                            label={
                                <Stack className={`planContainer__item ${
                                    Number(plan.id) === Number(props.values.plan) ? 'active' : ''
                                } ${props.errors.plan ? 'error' : ''}`} direction={'row'} alignItems={'center'}
                                       justifyContent={'space-between'}>
                                    <Stack direction={'row'} gap={2}>
                                        <div className={'planContainer__item--icon'}>
                                            <img src="/images/icons/checkbox-check.svg" alt="plan1"
                                                 className={'checked'}/>
                                            <img src="/images/icons/checkbox-uncheck.svg" alt="plan1"
                                                 className={'checked'}/>
                                        </div>
                                        <div>
                                            <div className={'planContainer__item--title'}>
                                                <Typography variant={'h6'}>
                                                    {plan.name}
                                                </Typography>
                                            </div>
                                            <Typography variant={'body2'}>
                                                ${plan.price}/{plan.billingMethod} + {plan.description}
                                            </Typography>
                                        </div>
                                    </Stack>
                                    <div>
                                        <ArrowForwardIcon/>
                                    </div>
                                </Stack>
                            }
                        />
                    ))}
                </RadioGroup>
                {
                    props.errors.plan && (
                        <Typography variant={'body2'} style={{
                            color: '#d32f2f',
                            fontSize: '0.875rem',
                            marginTop: '3px',
                            marginRight: '14px',
                            marginBottom: 0,
                            marginLeft: '14px'
                        }}>
                            {props.errors.plan}
                        </Typography>
                    )
                }
            </div>
        </>
    );
}

export default SignUpViewThree;
