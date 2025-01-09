import React from 'react';
import { TextField, Box } from '@mui/material';

const CodeInputComponent = ({ code, onCodeChange }) => {
  return (
    <Box display="flex" justifyContent="center" gap={1} mt={2}>
      {[0, 1, 2, 3].map((i) => (
        <TextField
          key={i}
          inputProps={{ maxLength: 1 }}
          value={code[i]}
          onChange={(e) => onCodeChange(i, e.target.value)}
          variant="outlined"
          margin="dense"
          sx={{ width: 50 }}
        />
      ))}
    </Box>
  );
};

export default CodeInputComponent;
