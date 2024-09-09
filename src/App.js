// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme from Material-UI
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import AddExpense from './components/Expenses/AddExpense';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Customize your primary color
    },
    secondary: {
      main: '#ff4081', // Customize your secondary color
    },
  },
});

const App = () => {
  return (
    // Wrap your app with ThemeProvider
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {/* Define your routes */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
