import {Stack} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import {UnionSVG} from "@/assets";
import useMediaQuery from "@mui/material/useMediaQuery";

const BaseNotificationBar = ({children, allowMargin, largeText}) => {
    const theme = useTheme();
    const isTab = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Stack direction={largeText ? {
            lg: 'row',
            xs: 'column',
        } : {
            xs: 'column',
            sm: 'row',
        }} gap={2} justifyContent={'space-between'} alignItems={'center'} sx={{
            backgroundColor: '#202020',
            padding: isTab ? '20px 20px' : '20px 30px',
            position: 'relative',
            zIndex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            margin: allowMargin ? '20px 0' : 0,
        }}

        >

            {
                !isTab && <>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}>
                        <UnionSVG/>
                    </div>
                </>
            }


            {children}
        </Stack>
    )
}


export default BaseNotificationBar;