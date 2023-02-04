import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function SupportForm() {
    return (
        <>
            <Select defaultValue="" id="support-select" label="Support" sx={{ width: 500 }}
            >
                <MenuItem value={1}>Included (Red Hat SRE support)</MenuItem>
                <MenuItem value={2}>Business (AWS + Red Hat SRE support)</MenuItem>
            </Select>

        </>
    );
}

export default SupportForm;