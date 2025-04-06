import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', padding: '8px' }}>
      <Toolbar>
        {/* Left - Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          InterviewBot
        </Typography>

        {/* Right - Navigation Links */}
        <Box>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Login</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
