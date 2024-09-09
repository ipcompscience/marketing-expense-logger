// src/components/Auth/ResetPassword.js
import React, { useState } from 'react';
import { resetPassword } from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Updated import
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage('A password reset link has been sent to your email.');
      setTimeout(() => navigate('/login'), 3000); // Navigate after 3 seconds to allow the message to display
    } catch (err) {
      setError('Could not send reset link. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Send Reset Link
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
