// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchExpenses } from '../../services/api';
import ExpenseList from '../Expenses/ExpenseList';
import ExpenseChart from '../Expenses/ExpenseChart';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await fetchExpenses();
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to load expenses.');
      } finally {
        setLoading(false);
      }
    };
    loadExpenses();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <>
            <ExpenseChart expenses={expenses} />
            <ExpenseList expenses={expenses} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
