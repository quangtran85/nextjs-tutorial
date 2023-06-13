import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ThanksPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" sx={{ color: '#0066ff', mb: 2 }}>
        Thank you for your business!
      </Typography>
    </Box>
  );
}
