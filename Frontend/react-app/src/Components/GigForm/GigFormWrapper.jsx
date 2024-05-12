import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import GigForm from './GigForm';

const GigFormWrapper = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" >
      <DialogContent>
        <GigForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default GigFormWrapper;
