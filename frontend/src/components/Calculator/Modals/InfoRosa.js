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

function InfoRosa() {
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
                        Red Hat OpenShift on AWS - Managed OpenShift in the cloud
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Red Hat OpenShift Service on AWS (ROSA) provides an integrated experience to use OpenShift. If you are already familiar with OpenShift, you can accelerate your application development process by leveraging familiar OpenShift APIs and tools for deployments on AWS. With ROSA, you can use the wide range of AWS compute, database, analytics, machine learning, networking, mobile, and other services to build secure and scalable applications faster. ROSA comes with pay-as-you-go hourly and annual billing, a 99.95% SLA, and joint support from AWS and Red Hat.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ROSA makes it easier for you to focus on deploying applications and accelerating innovation by moving the cluster lifecycle management to Red Hat and AWS. With ROSA, you can run containerized applications with your existing OpenShift workflows and reduce the complexity of management.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Link href="https://aws.amazon.com/rosa/" variant="body2">
                            Learn more
                        </Link>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default InfoRosa;