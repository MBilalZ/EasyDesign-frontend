import React, {useRef} from 'react';
import DatePicker, {DateObject} from "react-multi-date-picker";
import {Button} from "@mui/material";
import "react-multi-date-picker/styles/colors/green.css"
import InputIcon from "react-multi-date-picker/components/input_icon"

const BaseDatePicker = ({value, setValue}) => {
    const datePickerRef = useRef();
    const handleDateSelect = (dates) => {
        setValue(dates);
    }


    const handleDateClickButton = (range) => {
        const today = new DateObject();
        let startDate, endDate;

        switch (range) {
            case 'today':
                startDate = new DateObject();
                endDate = new DateObject();
                break;
            case 'yesterday':
                startDate = new DateObject().subtract(1, 'day');
                endDate = new DateObject();
                break;
            case 'lastWeek':
                startDate = new DateObject().subtract(1, 'week').setDay(today.weekDay.index); // Set to start of the last week same day
                endDate = new DateObject();
                break;
            case 'lastMonth':
                startDate = new DateObject().subtract(1, 'month').set('day', today.day); // Set to the same day last month
                endDate = new DateObject();
                break;
            case 'lastQuarter':
                const currentMonth = today.month.index; // 0-11
                const currentQuarter = Math.floor(currentMonth / 3);
                const lastQuarterStartMonth = ((currentQuarter - 1) * 3 + 12) % 12;
                const lastQuarterYear = currentQuarter === 0 ? today.year - 1 : today.year;

                startDate = new DateObject({year: lastQuarterYear, month: lastQuarterStartMonth + 1, day: 1});

                // Set end date to today
                endDate = new DateObject();

                break;
            case 'reset':
                setValue([]);
                return;
            default:
                startDate = new DateObject();
                endDate = new DateObject();
                break;
        }

        setValue([startDate, endDate]);
    }

    return (
        <div className={'custom-date-picker'}>
            <DatePicker render={<InputIcon/>} className="green" dateSeparator=" to " range rangeHover
                        ref={datePickerRef} value={value}
                        onChange={handleDateSelect}>
                <div className={'rmdp-wrapper__dates'}>
                    <div>
                        <Button
                            color={'primary'}
                            variant={'text'}
                            size={'small'}
                            className={'rmdp-wrapper__dates--item'}
                            onClick={() => handleDateClickButton('today')}
                        >
                            Today
                        </Button>
                        <Button
                            color={'primary'}
                            variant={'text'}
                            size={'small'}
                            className={'rmdp-wrapper__dates--item'}
                            onClick={() => handleDateClickButton('yesterday')}
                        >
                            Yesterday
                        </Button>
                        <Button
                            color={'primary'}
                            variant={'text'}
                            size={'small'}
                            className={'rmdp-wrapper__dates--item'}
                            onClick={() => handleDateClickButton('lastWeek')}
                        >
                            Last week
                        </Button>
                        <Button
                            color={'primary'}
                            variant={'text'}
                            size={'small'}
                            className={'rmdp-wrapper__dates--item'}
                            onClick={() => handleDateClickButton('lastMonth')}
                        >
                            Last month
                        </Button>
                        <Button
                            color={'primary'}
                            variant={'text'}
                            size={'small'}
                            className={'rmdp-wrapper__dates--item'}
                            onClick={() => handleDateClickButton('lastQuarter')}
                        >
                            Last quarter
                        </Button>
                    </div>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        size={'small'}
                        className={'rmdp-wrapper__dates--item'}
                        onClick={() => handleDateClickButton('reset')}
                    >
                        Reset
                    </Button>
                </div>
            </DatePicker>
        </div>
    );
};

export default BaseDatePicker;
