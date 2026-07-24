import { Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

interface SignatureStatusSummaryProps {
  title: string;
  firmadoCount: number;
  noFirmadoCount: number;
  firmadoValue?: number;
  noFirmadoValue?: number;
  icon?: React.ReactNode;
}

interface TrendData {
  month: string;
  count: number;
}

const SignatureStatusSummary = ({ title, firmadoCount, noFirmadoCount, firmadoValue = 0, noFirmadoValue = 0, icon }: SignatureStatusSummaryProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [peakMonth, setPeakMonth] = useState('');
  const [averagePerMonth, setAveragePerMonth] = useState(0);

  // Fixed month order
  const monthOrder = [
    'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 
    'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26'
  ];

  useEffect(() => {
    if (dialogOpen) {
      fetchTrendData();
    }
  }, [dialogOpen]);

  const fetchTrendData = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}sampleData.xlsx`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet);

      // Group by month from "Signature Completion Date"
      const monthMap: { [key: string]: number } = {};
      console.log(monthMap);

      excelData.forEach((row: any) => {
        const completionDate = row['Signature Completion Date'];
        console.log(completionDate);
        const signatureStatus = row['Signatures Status'];
        console.log(signatureStatus);

        // Only count completed signatures with valid dates
        if (completionDate && signatureStatus ) {
          try {
            // Parse date: Excel format is typically MM/DD/YYYY or similar
            console.log('john');
            const dateObj = new Date(completionDate);
            if (!isNaN(dateObj.getTime())) {
              const month = dateObj.toLocaleString('en-US', { month: 'short', year: '2-digit' }).replace(' ', ' ');
              const monthKey = `${month.split(' ')[0]} ${month.split(' ')[1]}`;
              console.log('hai',monthKey);
              monthMap[monthKey] = (monthMap[monthKey] || 0) + 1;
            }
          } catch (e) {
            // Skip invalid dates
          }
          
        }console.log('hai');
      });

      // Create data array with all months in fixed order
      const data: TrendData[] = monthOrder.map(month => ({
        month,
        count: monthMap[month] || 0
      }));

      // Calculate statistics
      const total = Object.values(monthMap).reduce((a, b) => a + b, 0);
      const max = Math.max(...Object.values(monthMap), 0);
      const maxMonth = Object.entries(monthMap).find(([_, count]) => count === max)?.[0] || '';
      const avg = Object.keys(monthMap).length > 0 ? Math.round(total / Object.keys(monthMap).length) : 0;

      setTrendData(data);
      console.log(data);
      setTotalCompleted(total);
      setPeakMonth(maxMonth);
      setAveragePerMonth(avg);
    } catch (error) {
      console.error('Error reading Excel file for trend data:', error);
    }
  };
  const total = firmadoCount + noFirmadoCount;
  const firmadoPercentage = total > 0 ? ((firmadoCount / total) * 100).toFixed(1) : '0.0';
  const noFirmadoPercentage = total > 0 ? ((noFirmadoCount / total) * 100).toFixed(1) : '0.0';

  const formattedFirmadoValue = firmadoValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedNoFirmadoValue = noFirmadoValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <Card
        onClick={() => setDialogOpen(true)}
        sx={{
          backgroundColor: '#FFFFFF',
          border: "1px solid #c6e0f5ff",
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'visible',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
            backgroundColor: '#F8FAFB',
          },
          height: '100%',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <CardContent
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Icon Badge - Top Right, Floating Above Card Border */}
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: '-16px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0F766E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
              zIndex: 10,
            }}
          >
            {icon}
          </Box>
        )}

        {/* Header */}
        <Box sx={{ marginBottom: '12px' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '12px',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Breakdown - two columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto' }}>
          {/* SIGNED */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em',
              }}
            >
              Signed
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {firmadoCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {firmadoPercentage}%
            </Typography>
            {firmadoValue > 0 && (
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#16A34A',
                  wordBreak: 'break-word',
                  marginTop: '6px',
                }}
              >
                {formattedFirmadoValue}
              </Typography>
            )}
          </Box>

          {/* UNSIGNED */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em',
              }}
            >
              Unsigned
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '2px',
              }}
            >
              {noFirmadoCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}
            >
              {noFirmadoPercentage}%
            </Typography>
            {noFirmadoValue > 0 && (
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1E3A8A',
                  wordBreak: 'break-word',
                  marginTop: '6px',
                }}
              >
                {formattedNoFirmadoValue}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Total footer */}
        <Box
          sx={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid #E5E7EB',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#374151',
            }}
          >
            Total: {total.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
      </Card>

      {/* Signature Completion Trend Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            width: '950px',
            maxWidth: '95vw',
            overflow: 'hidden',
            borderRadius: '16px',
          }
        }}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh',
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: '#374151',
            fontSize: '18px',
            paddingBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}
        >
          Signature Completion Trend
        </DialogTitle>

        <DialogContent sx={{ 
          paddingTop: '20px', 
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flexGrow: 1,
          overflow: 'auto',
        }}>
          {/* KPI Cards Row - Horizontal */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '16px',
            flexShrink: 0,
          }}>
            {/* Total Completed */}
            <Box sx={{ 
              backgroundColor: '#F3F4F6', 
              borderRadius: '8px', 
              padding: '16px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              flex: 1,
            }}>
              <Typography 
                sx={{ 
                  fontSize: '11px', 
                  color: '#6B7280', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}
              >
                Total Completed
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: '#003d66' 
                }}
              >
                {totalCompleted}
              </Typography>
            </Box>

            {/* Peak Month */}
            <Box sx={{ 
              backgroundColor: '#F3F4F6', 
              borderRadius: '8px', 
              padding: '16px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              flex: 1,
            }}>
              <Typography 
                sx={{ 
                  fontSize: '11px', 
                  color: '#6B7280', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}
              >
                Peak Month
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: '#003d66' 
                }}
              >
                {peakMonth || 'N/A'}
              </Typography>
            </Box>

            {/* Average Per Month */}
            <Box sx={{ 
              backgroundColor: '#F3F4F6', 
              borderRadius: '8px', 
              padding: '16px',
              textAlign: 'center',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              flex: 1,
            }}>
              <Typography 
                sx={{ 
                  fontSize: '11px', 
                  color: '#6B7280', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}
              >
                Average Per Month
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: '#003d66' 
                }}
              >
                {averagePerMonth}
              </Typography>
            </Box>
          </Box>

          {/* Line Chart */}
          {trendData.length > 0 && (
            <Box sx={{ 
              width: '100%', 
              height: '320px',
              flexShrink: 0,
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6B7280' }} 
                    label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                    formatter={(value: any) => [`${value} signatures`, 'Completed']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#378ADD" 
                    strokeWidth={3}
                    dot={{ fill: '#378ADD', r: 5 }}
                    activeDot={{ r: 7 }}
                    label={{ position: 'top', fill: '#374151', fontWeight: 600 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ 
          padding: '16px', 
          borderTop: '1px solid #E5E7EB',
          flexShrink: 0,
          justifyContent: 'center',
        }}>
          <Button
            onClick={() => setDialogOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: '#1D9E75',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              padding: '10px 32px',
              fontSize: '14px'
              }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignatureStatusSummary;