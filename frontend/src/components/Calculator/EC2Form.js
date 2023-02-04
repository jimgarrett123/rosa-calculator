import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function EC2Form(props) {
    const { formValues, handleInputChange, handleAutocompleteChange } = props;
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(props["location-data"])
            .then((res) => res.json(), {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
            .then(
                (result) => {
                    setProduct(result);
                },
                (error) => {
                    setError(error);
                }
            );
    }, [props]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (product) {
        const instances = product.instances;
        const defaultInstance = instances.find((option) => option.id === 'm5.xlarge')

        return (
            <>
                <Autocomplete
                    id="instanceType-input"
                    name="instance"
                    options={instances.sort((a, b) => -b.category.localeCompare(a.category))}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => `${option.id} - ${option.cpu} vCPUs, ${option.memory} Memory (GiB)`}
                    sx={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Search instances by name" />}
                    value={formValues.name}
                    defaultValue={defaultInstance}
                    onChange={handleAutocompleteChange}

                    isOptionEqualToValue={(option, newValue) => {
                        return option.id === newValue.id;
                    }}
                />
                <TextField
                    sx={{ marginTop: '15px ' }}
                    id="instanceCount-input"
                    name="instanceCount"
                    label="Number of worker nodes"
                    type="text"
                    value={formValues.name}
                    defaultValue={3}
                    onChange={handleInputChange}
                    variant="outlined"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />

            </>
        );
    }
}

export default EC2Form;