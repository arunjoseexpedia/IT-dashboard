import { Box, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

interface ApplicationsSummaryProps {
  title: string;
  totalCount: number;
  templateCount: number;
  noTemplateCount: number;
  icon?: React.ReactNode;
}

interface TrendData {
  month: string;
  count: number;
}

const ApplicationsSummary = ({ title, totalCount, templateCount, noTemplateCount, icon }: ApplicationsSummaryProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);

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

      // Group by month from "Request Start Date (Numeric Format)"
      const monthMap: { [key: string]: { count: number; dateObj: Date } } = {};
      let maxDate: Date | null = null;

      excelData.forEach((row: any) => {
        const requestStartDate = row['Request Creation Period'];

        if (requestStartDate) {
          try {
            const dateObj = new Date(requestStartDate);
            if (!isNaN(dateObj.getTime())) {
              const month = dateObj.toLocaleString('en-US', { month: 'short', year: '2-digit' });
              
              if (!monthMap[month]) {
                monthMap[month] = { count: 0, dateObj };
              }
              monthMap[month].count++;

              // Track maximum date
              if (!maxDate || dateObj > maxDate) {
                maxDate = dateObj;
              }
            }
          } catch (e) {
            // Skip invalid dates
          }
        }
      });

      // Calculate the 12-month range starting from maxDate
      let startDate: Date | null = null;
      if (maxDate) {
        startDate = new Date(maxDate);
        startDate.setMonth(startDate.getMonth() - 11); // Go back 11 months (12 total)
      }

      // Create an array of months for the last 12 months
      const months: Array<{ month: string; dateObj: Date }> = [];
      if (startDate && maxDate) {
        const current = new Date(startDate);
        const max = new Date(maxDate);
        while (current.getTime() <= max.getTime()) {
          const monthStr = current.toLocaleString('en-US', { month: 'short', year: '2-digit' });
          months.push({ month: monthStr, dateObj: new Date(current) });
          current.setMonth(current.getMonth() + 1);
        }
      }

      // Build trend data with all months (including zero values)
      const data: TrendData[] = months.map(({ month }) => ({
        month,
        count: monthMap[month]?.count || 0
      }));

      // Calculate total
      const total = Object.values(monthMap).reduce((sum, item) => sum + item.count, 0);

      setTrendData(data);
      setTotalApplications(total);
    } catch (error) {
      console.error('Error reading Excel file for application trend data:', error);
    }
  };
  const templatePercentage = totalCount > 0 ? ((templateCount / totalCount) * 100).toFixed(1) : '0.0';
  const noTemplatePercentage = totalCount > 0 ? ((noTemplateCount / totalCount) * 100).toFixed(1) : '0.0';

  return (
    <>
      <Card
        onClick={() => setDialogOpen(true)}
        sx={{
          backgroundColor: '#FFFFFF',
          border: "1px solid #c2f4cbff",
          
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
          flexDirection: 'column'
          
        }}
      >
      {/* Wave Accent - Bottom Right */}
     
      <CardContent
        sx={{
          padding: '20px',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          overflow: 'visible',
          gap: '8px',
        }}
      >
        {/* Icon Badge - Top Right, Floating Above Card Border */}
        {icon && (
          <Box
            sx={{
              position: 'absolute',
              top: '-22px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
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

        {/* Total count - Main prominent display */}
        <Box sx={{ marginBottom: '4px' }}>
          <Typography
            sx={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#1E3A8A',
              lineHeight: 1,
            }}
          >
            {totalCount.toLocaleString()}
          </Typography>
        </Box>

        {/* Breakdown - two columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto', paddingTop: '8px' }}>
          {/* WITH TEMPLATE */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em',
              }}
            >
              With Template
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '4px',
                lineHeight: 1.2,
              }}
            >
              {templateCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {templatePercentage}%
            </Typography>
          </Box>

          {/* NO TEMPLATE */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#9CA3AF',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em',
              }}
            >
              No Template
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '4px',
                lineHeight: 1.2,
              }}
            >
              {noTemplateCount.toLocaleString()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: '12px',
                color: '#9CA3AF',
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {noTemplatePercentage}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
      </Card>

      {/* Application Trend Dialog */}
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
            borderBottom: '1px solid #E5E7EB',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}
        >
          Request Creation Trend - Last 12 Months
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
          {/* Summary Metric Card */}
          <Box sx={{ 
            backgroundColor: '#F3F4F6', 
            borderRadius: '8px', 
            padding: '16px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            flexShrink: 0,
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
              Total Applications
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '28px', 
                fontWeight: 700, 
                color: '#1E3A8A' 
              }}
            >
              {totalApplications}
            </Typography>
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
                    label={{ value: 'Applications', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '8px 12px',
                    }}
                    formatter={(value: any) => [`${value} applications`, 'Total']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#1E3A8A" 
                    strokeWidth={3}
                    dot={{ fill: '#1E3A8A', r: 5 }}
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
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '8px',
              padding: '10px 32px',
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#1D4ED8',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplicationsSummary;
