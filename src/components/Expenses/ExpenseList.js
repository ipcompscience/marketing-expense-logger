// src/components/Expenses/ExpenseList.js
import React from 'react';
import ExpenseItem from './ExpenseItem';
import { Box, Typography, Paper, List } from '@mui/material';

const ExpenseList = ({ expenses }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Expense List
      </Typography>
      <Paper>
        <List>
          {expenses.length === 0 ? (
            <Typography sx={{ p: 2 }}>No expenses found.</Typography>
          ) : (
            expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} />)
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ExpenseList;
