import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', padding: '8px' }}>
      <Toolbar>
        {/* Left - Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          InterviewBot
        </Typography>

        {/* Right - Navigation Links */}
        <Box sx={{ display: 'flex', gap: '16px' }}> {/* Add flex and gap for spacing */}
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/profile')}
          >
            Profile
          </Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/')}
          >
            Dashboard
          </Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;