import React, {useState} from "react";

import {
    Typography,
    Grid,
    Button,
    makeStyles,
    TextField
} from "@material-ui/core";
import AutoComplete from "./utils/AutoField";
import DialogBox from "./utils/Dialog";
import {addSpec, updateSpec} from "../../data/adminApi";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
    my3: {
        margin: "1.3rem 0"
    },
    mRight: {
        marginRight: ".85rem"
    },
    main: {
        margin: "2.5rem"
    },
    end: {
        paddingLeft: '15px'
    }

}));

const AddSpec = ({handleClose, spec,trigger}) => {

    const vendors = spec.map((item) => {
        return {Vendor: item.Vendor}
    })

    const classes = useStyles();

    const [vendor, setVendor] = useState('');
    const [tech, setTech] = useState('');

    const [sub, setSub] = useState('');

    const [loading,setLoading] = useState(false)

    const [vendorToggle, setVendorToggle] = useState(false);
    const [techToggle, setTechToggle] = useState(false);

    const [vendorDialogValue, setVendorDialogValue] = useState('')
    const [techDialogValue, setTechDialogValue] = useState('')

    const vendorHandleClose = () => {
        setVendorDialogValue('')

        setVendorToggle(false);
    };
    const techHandleClose = () => {
        setTechDialogValue('')

        setTechToggle(false);
    };

    const vendorHandleSubmit = (event) => {
        event.preventDefault();
        setVendor(vendorDialogValue);

        vendorHandleClose();
    };
    const techHandleSubmit = (event) => {
        event.preventDefault();
        setTech(techDialogValue);
        techHandleClose();
    };

    const cancelHandler = () => {
        handleClose();
    }

    let uid;
    let create = false

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true)

        if (create) {
            const newData = {
                Vendor: vendor,
                Technology: {}
            }

            newData.Technology[tech] = [sub]

            addSpec(newData)
                .then((res) => {
                    trigger()
                    handleClose();
                })
                .catch(e => {
                    console.log(e.response)
                })
                .finally(()=>{
                    setLoading(false)
                })
        } else {
            const specData = {
                Technology: tech.Technology ? tech.Technology : tech,
                sub
            }

            updateSpec(uid, specData)
                .then((res) => {
                    trigger()
                    handleClose();
                })
                .catch(e => {
                    console.log(e.response)
                }).finally(()=>{
                    setLoading(false)
                })
        }

    }

    const technology = [];

    if (vendor != null || vendor !== undefined) {
        if (vendor && vendor.Vendor) {
            create = false

            spec.map((item) => {
                if (vendor.Vendor === item.Vendor) {
                    uid = item.specId

                    Object.keys(item.Technology).map((item) => {
                        technology.push({Technology: item})
                    })
                }
            })
        } else {
            create = true
        }

    }

    return (
        <div>
            <Grid container className={classes.my3} alignItems="center">
                <Grid item className={classes.mRight}>
                    <Typography variant="button" display="block" gutterBottom>
                        Add Specification
                        {loading &&
                        <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}}/>}
                    </Typography>

                </Grid>
            </Grid>

            <Grid container className={classes.main} alignItems="center">
                <Grid container>
                    <Grid item xs={4}>
                        <AutoComplete
                            value={vendor}
                            toggleSetTrue={setVendorToggle}
                            dialogValue={setVendorDialogValue}
                            setValue={setVendor}
                            option={vendors}
                            textLabel="Vendor"
                        />
                        {vendorToggle &&
                        <DialogBox
                            toggle={vendorToggle}
                            onClose={vendorHandleClose}
                            submit={vendorHandleSubmit}
                            dialogValue={vendorDialogValue}
                            setDialogValue={setVendorDialogValue}
                            labelName="Add new Vendor"
                            context="Did you miss any Vendor in the list? Please, add it!"
                            textLabel="Vendor"
                        />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <AutoComplete
                            value={tech}
                            toggleSetTrue={setTechToggle}
                            dialogValue={setTechDialogValue}
                            setValue={setTech}
                            option={technology}
                            textLabel="Technology"
                        />
                        {techToggle &&
                        <DialogBox
                            toggle={techToggle}
                            onClose={techHandleClose}
                            submit={techHandleSubmit}
                            dialogValue={techDialogValue}
                            setDialogValue={setTechDialogValue}
                            labelName="Add new Technology"
                            context="Did you miss any Technology in the list? Please, add it!"
                            textLabel="Technology"
                        />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <TextField onChange={(e) => {
                            setSub(e.target.value)
                        }} value={sub} id="outlined-basic" label="Tech sub area" variant="outlined"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="flex-end" xs={11}>
                <Grid item xs={1}>
                    <Button onClick={handleClick} variant="contained" color="primary">
                        <small>Create</small>
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={cancelHandler} type="submit" variant="contained" color="white">
                        <small>Cancel</small>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};


export default AddSpec;
