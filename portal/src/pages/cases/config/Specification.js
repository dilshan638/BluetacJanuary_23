import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {Button, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getAllSpec, getConsultants} from "../../../data/casesApi";
import AutoComplete from "../addWizard/utils/AutoField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";



const useStyles = makeStyles((theme) => ({


    text: {
        fontSize:14,
        fontWeight:500
    },

    button :{
        float:"right",
        textDecoration: "none",
        marginTop:'1.8rem'
    },

    select:{
        width:'10rem',

    },
    selection:{
        marginTop:'1.8rem'
    }

}));


function Specification(props){

    const [vendor , setVendor] = useState('')


    const [consultant , setConsultant] = useState('')


    const [user,setUser] = useState([])


    const [tech, setTech] = useState('');

    const [spec,setSpec] = useState([]);

    const [sub,setSub] = useState('')


    let history = useHistory();
    const classes = useStyles();


    const handleChage = e=>{
        setConsultant(user[e.target.value])
    }


    const vendors = spec.map((item) => {
        return {Vendor: item.Vendor}
    })

    const technology = [];
    const subTech = [];




    if (vendor != null || vendor !== undefined) {
        if (vendor && vendor.Vendor) {
            spec.map((item) => {
                if (vendor.Vendor === item.Vendor) {
                    Object.keys(item.Technology).map((i,number) => {
                        technology.push( i)

                        if(tech!=='' && tech === technology[number] ){
                            item.Technology[i].map((data,num)=>{
                                subTech.push(data)
                            })
                        }
                    })

                }

            })
        }

    }


    useEffect(()=>{
        getConsultants()
            .then((res)=>{
                debugger; //
                setUser(res.data)

            })
            .catch((e)=>{
                console.log(e.message)
            })

        getAllSpec()
            .then((res)=>{
                setSpec(res.data)
            })
            .catch(e=>{
                console.log(e.response)
            })

    },[])

    const [value, setValue] = React.useState('system');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const selection = ()=>{
        if(value==='select'){
            return(
                <FormControl variant="outlined" className={classes.selection}>
                    <InputLabel htmlFor="outlined-age-native-simple">Consultant</InputLabel>
                    <Select
                        native
                        className={classes.select}
                        label="Consultant"
                        id="Consultant"
                        onChange={handleChage}
                    >
                        <option aria-label="None" value="" />
                        {user && user.length!==0 && user.map((option, index) =>
                            <option key={index} value={index}>
                                {option.displayName}
                            </option>
                        )}
                    </Select>
                </FormControl>
            )
        }
    }


    const submitForm = (e) => {
        e.preventDefault();

        props.dispatch({
            type: 'specSubmitted',
            submittedData: {
                vendor: vendor.Vendor,
                subTech: sub,
                technology: tech,
                consultant:consultant ? consultant : 'System Pick'
            }
        });


        console.log('over here')
        history.push('/cases/add/spec');
        setVendor("")
        // setTechnology("")
        setConsultant("")

        setSub("");

        props.onAdd();

    }
    return(
        <div>
            <form onSubmit={submitForm}>
                <Box >
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <AutoComplete
                                value={vendor}
                                setValue={setVendor}
                                option={vendors}
                                textLabel="Vendor"
                            />
                        </Grid>
                        {technology.length!==0 &&
                            <Grid item xs={4}>
                                <AutoComplete
                                    value={tech}
                                    setValue={setTech}
                                    option={technology}
                                    textLabel="Technology"
                                />
                            </Grid>
                        }
                        {
                            subTech.length!==0 &&
                            <Grid item xs={4}>
                                <AutoComplete
                                    value={sub}
                                    setValue={setSub}
                                    option={subTech}
                                    textLabel="Sub"
                                />
                            </Grid>
                        }


                            {/*<Grid item xs={3}>*/}
                            {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
                            {/*        <InputLabel htmlFor="outlined-age-native-simple">Consultant</InputLabel>*/}
                            {/*        <Select*/}
                            {/*            native*/}
                            {/*            className={classes.select}*/}
                            {/*            label="Consultant"*/}
                            {/*            id="Consultant"*/}
                            {/*            onChange={handleChage}*/}
                            {/*        >*/}
                            {/*            <option aria-label="None" value="" />*/}
                            {/*            {user && user.length!==0 && user.map((option, index) =>*/}
                            {/*                <option key={index} value={index}>*/}
                            {/*                    {option.displayName}*/}
                            {/*                </option>*/}
                            {/*            )}*/}
                            {/*        </Select>*/}
                            {/*    </FormControl>*/}
                            {/*    <br />*/}
                            {/*</Grid>*/}


                    </Grid>
                    <br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Consultant</FormLabel>
                        <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
                            <FormControlLabel
                                value="system"
                                control={<Radio color="primary" />}
                                label="System Pick"
                                labelPlacement="System Pick"
                            />
                            <FormControlLabel value="select" control={<Radio color="primary" />} label="I need to select the Consultant" />
                        </RadioGroup>
                    </FormControl>

                    {selection()}

                    <Button type="submit" className={classes.button} color="primary" variant="contained">Add Specification</Button>
                </Box>

            </form>
        </div>
    )
}

export default Specification;