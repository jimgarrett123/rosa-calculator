import React from "react";
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';

function RegionForm() {
    return (
        <>
            <Select defaultValue={1} id="region-select" label="Region" sx={{ width: 500 }}
            >

                <ListSubheader>North America</ListSubheader>
                <MenuItem value={1}>US East (N. Virginia)   - us-east-1</MenuItem>
                <MenuItem value={2}>US East (Ohio)          - us-east-2</MenuItem>
                <MenuItem value={3}>US West (N. California) - us-west-1</MenuItem>
                <MenuItem value={4}>US West (Oregon)       - us-west-2</MenuItem>
                <MenuItem value={5}>Canada (Central) - ca-central-1</MenuItem>

                <ListSubheader>South America</ListSubheader>
                <MenuItem value={6}>South America (São Paulo) - sa-east-1</MenuItem>

                <ListSubheader>Asia</ListSubheader>
                <MenuItem value={7}>Asia Pacific (Tokyo) - ap-northeast-1</MenuItem>
                <MenuItem value={8}>Asia Pacific (Seoul) - ap-northeast-2</MenuItem>
                <MenuItem value={9}>Asia Pacific (Osaka) - ap-northeast-3 </MenuItem>
                <MenuItem value={10}>Asia Pacific (Mumbai) - ap-south-1     </MenuItem>
                <MenuItem value={11}>Asia Pacific (Singapore) - ap-southeast-1</MenuItem>
                <MenuItem value={12}>Asia Pacific (Sydney) - ap-southeast-2</MenuItem>

                <ListSubheader>Europe</ListSubheader>
                <MenuItem value={13}>Europe (Frankfurt) - eu-central-1</MenuItem>
                <MenuItem value={14}>Europe (Stockholm) - eu-north-1</MenuItem>
                <MenuItem value={15}>Europe (Ireland)   - eu-west-1</MenuItem>
                <MenuItem value={16}>Europe (London)    - eu-west-2</MenuItem>
                <MenuItem value={17}>Europe (Paris)     - eu-west-3</MenuItem>

            </Select>

        </>
    );
}

export default RegionForm;