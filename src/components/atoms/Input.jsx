import React from 'react';
import TextField from '@mui/material/TextField';

export default function AtomInput({ label, ...props }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{
        borderRadius: 2,
        backgroundColor: '#f8fafc',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
      }}
      {...props}
    />
  );
}
