import { Box, Typography, Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const AribaReport = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [noTemplateCount, setNoTemplateCount] = useState(0);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number; percentage: string }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching sampleData.xlsx...');
        const response = await fetch('/sampleData.xlsx');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        console.log('ArrayBuffer received, size:', arrayBuffer.byteLength);
        
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        console.log('Workbook read successfully');
        
        const sheetName = workbook.SheetNames[0];
        console.log('Sheet name:', sheetName);
        
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);
        
        // Count total rows
        const total = excelData.length;
        console.log('Total records:', total);
        
        // Count "No Template" and "Template"
        let noTemplate = 0;
        let template = 0;
        
        excelData.forEach((row: any) => {
          const templateValue = row['Pre-approved Standard Contract Template?'];
          if (templateValue === 'No') {
            noTemplate++;
          } else if (templateValue) {
            template++;
          }
        });
        
        console.log('No Template count:', noTemplate);
        console.log('Template count:', template);
        
        setTotalCount(total);
        setNoTemplateCount(noTemplate);
        setTemplateCount(template);
        
        // Calculate percentages for chart
        const templatePercentage = total > 0 ? ((template / total) * 100).toFixed(2) : '0.00';
        const noTemplatePercentage = total > 0 ? ((noTemplate / total) * 100).toFixed(2) : '0.00';
        
        const chartData = [
          { name: 'NO TEMPLATE', value: noTemplate, percentage: noTemplatePercentage },
          { name: 'TEMPLATE', value: template, percentage: templatePercentage }
        ];
        
        setChartData(chartData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setTotalCount(0);
        setTemplateCount(0);
        setNoTemplateCount(0);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Total Solicitudes Card */}
      <Box sx={{ marginBottom: '20px' }}>
        <Card sx={{ textAlign: 'center', backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a', 
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #02355a',
                paddingBottom: '10px'
              }}
            >
              Total Solicitudes
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a',
                fontSize: '3rem',
                marginTop: '15px'
              }}
            >
              {totalCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Template and No Template Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Template Card */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a', 
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #02355a',
                paddingBottom: '10px'
              }}
            >
              Template
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a',
                fontSize: '3rem',
                marginTop: '15px'
              }}
            >
              {templateCount}
            </Typography>
          </CardContent>
        </Card>

        {/* No Template Card */}
        <Card sx={{ textAlign: 'center', backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a', 
                textTransform: 'uppercase',
                marginBottom: '10px',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #02355a',
                paddingBottom: '10px'
              }}
            >
              No Template
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                color: '#02355a',
                fontSize: '3rem',
                marginTop: '15px'
              }}
            >
              {noTemplateCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Pie Chart Card */}
      <Card sx={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '20px' }}>
        <CardContent>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: '#02355a', 
              textTransform: 'uppercase',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              borderBottom: '2px solid #02355a',
              paddingBottom: '10px',
              textAlign: 'center'
            }}
          >
            Tipo de Contrato
          </Typography>
          
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#1976d2" />
                <Cell fill="#003d99" />
              </Pie>
              <Tooltip 
                formatter={(value: any) => `${value}`}
                labelFormatter={() => ''}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => value.toUpperCase()}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AribaReport;
