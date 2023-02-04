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

export default function InfoRegion() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Link onClick={handleOpen} sx={{ fontSize: '0.9em', fontWeight: 'normal', paddingLeft: '5px' }}>Info</Link>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        EC2 Instance specification
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Amazon EC2 provides a wide selection of instance types optimized to fit different use cases. Instance types comprise varying combinations of CPU, memory, storage, and networking capacity and give you the flexibility to choose the appropriate mix of resources for your applications. Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Link href="https://aws.amazon.com/ec2/instance-types/" variant="body2">
                            Learn more
                        </Link>
                    </Typography>

                </Box>
            </Modal>
        </>
    );
}
