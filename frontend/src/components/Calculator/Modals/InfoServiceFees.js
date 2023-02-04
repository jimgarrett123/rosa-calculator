import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    border: '2px solid #000',
    backgroundColor: '#fff',
    boxShadow: 24,
    p: 8,
};

function InfoServiceFees() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Link onClick={handleOpen} sx={{ fontSize: '0.9em', fontWeight: 'normal', paddingLeft: '5px' }}>Info</Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ROSA Service fees
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        The total cost of ROSA consists of two components: ROSA service fees and AWS infrastructure fees.

                        ROSA service fees accrue on demand, at an hourly rate of $0.171 per 4 vCPU used by worker nodes, plus a $0.03 per hour cluster fee. Service fees aren't charged for the control plane or required infrastructure nodes. ROSA service fees are uniform across all supported AWS Regions.

                        For a limited time, there will be no hourly cluster fee.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default InfoServiceFees;