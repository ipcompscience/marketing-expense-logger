// src/components/Expenses/ExpenseChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Paper, Typography } from '@mui/material';

const ExpenseChart = ({ expenses }) => {
  const categories = Array.from(new Set(expenses.map((expense) => expense.category)));
  const categoryData = categories.map((category) =>
    expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Expenses by Category
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Bar data={data} options={options} />
      </Paper>
    </Box>
  );
};

export default ExpenseChart;
