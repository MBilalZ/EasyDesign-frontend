import MUIDataTable from "mui-datatables";
import {TextField, Typography} from "@mui/material";
import Div from "@/components/base/Div.jsx";

const BaseDataTable = ({columns, data, options, title}) => {
    const defaultOptions = {

        selectableRows: "none",
        filter: false,
        print: false,
        viewColumns: false,
        confirmFilters: true,
        searchOpen: true,
        search: true,
        download: false,
        searchAlwaysOpen: true,
        customSearchRender: (searchText, handleSearch) => {
            return (
                <TextField
                    id="search-box"
                    type="text"
                    placeholder="Search"
                    value={searchText || ''}
                    onChange={(e) => handleSearch(e.target.value)}
                    inputProps={{
                        style: {
                            height: 40,
                            padding: '0 14px',
                        }

                    }}
                />
            );
        },
        ...options,

    }
    return (
        <Div className={'data-table-custom'}>
            <Typography variant={'h6'} fontSize={18} fontWeight={600} className={'title'}>{title}</Typography>
            <MUIDataTable
                data={data}
                columns={columns}
                options={defaultOptions}
            />
        </Div>
    );
};

export default BaseDataTable;