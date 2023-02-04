import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import "./Calculator.scss";
import InfoRegion from './Calculator/Modals/InfoRegion';
import InfoRosa from './Calculator/Modals/InfoRosa';
import InfoEC2 from './Calculator/Modals/InfoEC2';
import CostEstimate from "./Calculator/CostEstimate";
import EC2Form from "./Calculator/EC2Form";
import RegionForm from "./Calculator/RegionForm";


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    margin: "auto"
}));

function Calculator() {
    const defaultValues = {
        instance: {
            "cost": 0.192,
            "id": "m5.xlarge",
            "category": "General Purpose",
            "cpu": 4,
            "memory": "16.0 GiB"
        },
        instanceCount: 3,
    };
    const [formValues, setFormValues] = useState(defaultValues)
    const [instanceCost, setInstanceCost] = useState()

    const handleInputChange = (event, newValue) => {
        const { name, value } = event.target;

        let formValue = value
        if (!formValue) {
            formValue = newValue
        }
        setFormValues({
            ...formValues,
            [name]: formValue,
        });
    };

    const handleAutocompleteChange = (event, newValue) => {
        if (typeof newValue === 'string') {
            setInstanceCost(newValue.cost);
        } else if (newValue && newValue.inputValue) {
            setInstanceCost(newValue.inputValue.cost);
        } else {
            setInstanceCost(newValue.cost);
        }
    }

    return (

        <div className="calculator" >
            <CssBaseline />

            <Typography variant="h5" component="h2">
                Red Hat OpenShift on AWS (ROSA) Pricing Calculator <InfoRosa />
            </Typography>

            <Typography>
                Use this tool to estimate the software and infrastructure costs based on your configuration choices. Your usage and costs might be different from this estimate. They will be reflected on your monthly AWS billing reports.
            </Typography>

            <FormControl sx={{ m: 1 }}>

                <Grid container sx={{ width: '800px' }}>
                    <Grid item style={{ flexGrow: "1" }} xs={12}>
                        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }} >
                            <StyledPaper
                                sx={{
                                    my: 1,
                                    p: 2,
                                }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', m: 1, fontSize: '1.2em' }} noWrap>Region <InfoRegion /></Typography>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <RegionForm />
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <StyledPaper
                                sx={{
                                    my: 1,
                                    p: 2,
                                }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', m: 1, fontSize: '1.2em' }} noWrap>Compute <InfoEC2 /></Typography>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <EC2Form
                                            location-data="/content/calculator/rosa.json"
                                            formValues={formValues}
                                            handleInputChange={handleInputChange}
                                            handleAutocompleteChange={handleAutocompleteChange}
                                        />
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <StyledPaper
                                sx={{
                                    my: 1,
                                    p: 2,
                                }}
                            >
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', m: 1, fontSize: '1.2em' }} noWrap>Support</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        {/* <SupportForm /> */}
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                            <StyledPaper
                                sx={{
                                    my: 1,
                                    p: 2,
                                }}
                            >
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs={3}>
                                        <Typography sx={{ fontWeight: 'bold', m: 1 }} noWrap>Cost estimate</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <CostEstimate instanceCost={instanceCost ? instanceCost : defaultValues.instance.cost} instanceCount={formValues.instanceCount} />
                                    </Grid>
                                </Grid>
                            </StyledPaper>
                        </Box>
                    </Grid>
                </Grid>
            </FormControl>
        </div >
    );
}

export default Calculator;


