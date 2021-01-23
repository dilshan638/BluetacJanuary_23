import React  from "react";
import {CircularProgress, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";


const AutoComplete = ({value, setValue, option, textLabel}) => {

    const loading = option && option.length === 0 && textLabel==='Vendor';

    const hasOption = ()=>{
        return   !option.Vendor && option.length === 0;
    }

    return (
        <Autocomplete
            disabled={hasOption()}
            value={value}
            loading={loading}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            id={textLabel}
            options={option}
            getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                if (option.Vendor)
                    return option.Vendor;
                else
                    return option
            }}
            selectOnFocus
            clearOnBlur
            renderOption={(option) =>
                option.Vendor ? option.Vendor : option
            }

            renderInput={(params) => (
                <TextField
                    {...params}
                    label={textLabel}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ?<CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}


export default AutoComplete;