import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export default function LoadingOverlay({ open }) {
  return (
    <Backdrop
      sx={{
        color: "#00a1cb",
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
