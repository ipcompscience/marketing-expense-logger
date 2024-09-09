// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://ipexpenseloggertest.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => api.post('/auth/login', { email, password });
export const signupUser = async (email, password) => api.post('/auth/signup', { email, password });
export const resetPassword = async (email) => api.post('/auth/reset-password', { email });
export const fetchExpenses = async () => api.get('/expenses');
export const addExpense = async (expenseData) => api.post('/expenses', expenseData);
export const updateExpense = async (id, expenseData) => api.put(`/expenses/${id}`, expenseData);
export const deleteExpense = async (id) => api.delete(`/expenses/${id}`);
export const fetchReports = async (filters) => api.post('/reports', filters);
