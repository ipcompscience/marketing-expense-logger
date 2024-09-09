// src/components/Expenses/ExpenseItem.js
import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExpense } from '../../services/api';

const ExpenseItem = ({ expense }) => {
  const handleDelete = async () => {
    try {
      await deleteExpense(expense.id);
      window.location.reload(); // Reload the page to update the list after deletion
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={`${expense.name} - $${expense.amount}`}
        secondary={`${expense.category} - ${new Date(expense.date).toLocaleDateString()}`}
      />
    </ListItem>
  );
};

export default ExpenseItem;
