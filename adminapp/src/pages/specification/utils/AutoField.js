import React, {useState} from "react";
import {CircularProgress, TextField} from "@material-ui/core";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();
const AutoComplete = ({value, toggleSetTrue, dialogValue, setValue, option, textLabel}) => {

    const loading = option && option.length === 0 && textLabel==='Vendor';

    return (
        <Autocomplete
            value={value}
            loading={loading}
            onChange={(event, newValue) => {
                if (newValue && newValue.inputValue) {
                    toggleSetTrue(true);
                    dialogValue(newValue.inputValue);
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        Vendor: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
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
                    return option.Technology
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(option) => option.Vendor ? option.Vendor : option.Technology}
            style={{width: 300}}
            freeSolo
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


export default AutoComplete