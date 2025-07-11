import React from 'react';
import MuiAlert from '@mui/material/Alert';

export default function AtomAlert({ severity = 'error', children, ...props }) {
  return (
    <MuiAlert
      severity={severity}
      sx={{
        borderRadius: 2,
        fontSize: 15,
        mb: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiAlert>
  );
}
