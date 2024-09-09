// src/components/Reports/Reports.js
import React, { useState } from 'react';
import { fetchReports } from '../../services/api';
import { Container, TextField, Button, Typography, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetchReports({ startDate, endDate });
      setReportData(response.data);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Report', 14, 15);
    autoTable(doc, {
      head: [['Name', 'Amount', 'Category', 'Date']],
      body: reportData.map((expense) => [expense.name, `$${expense.amount}`, expense.category, new Date(expense.date).toLocaleDateString()]),
    });
    doc.save('expense-report.pdf');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generate Expense Report
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button variant="contained" onClick={handleGenerateReport} disabled={loading}>
            {loading ? 'Loading...' : 'Generate Report'}
          </Button>
        </Box>

        {reportData.length > 0 && (
          <>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
              <CSVLink data={reportData} filename="expense-report.csv" style={{ textDecoration: 'none' }}>
                <Button variant="outlined">Download CSV</Button>
              </CSVLink>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
