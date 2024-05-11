import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FreelancerForm from './FreelancerForm';

const FreelancerFormModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <FreelancerForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default FreelancerFormModal;
