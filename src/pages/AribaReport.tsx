import { Box, Typography, Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AribaReport = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [noTemplateCount, setNoTemplateCount] = useState(0);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number; percentage: string }>>([]);
  const [statusChartData, setStatusChartData] = useState<Array<{ name: string; [key: string]: any }>>([]);
  const [requestingAreaData, setRequestingAreaData] = useState<Array<{ name: string; count: number }>>([]);

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
        
        // Process Contract Status data for stacked bar chart
        const statusMap: { [key: string]: { [key: string]: number } } = {};
        
        excelData.forEach((row: any) => {
          const status = row['Contract Status'];
          const template = row['Pre-approved Standard Contract Template?'];
          
          if (status) {
            if (!statusMap[status]) {
              statusMap[status] = { 'FIRMADO': 0, 'NO FIRMADO': 0 };
            }
            
            if (template === 'No') {
              statusMap[status]['NO FIRMADO']++;
            } else {
              statusMap[status]['FIRMADO']++;
            }
          }
        });
        
        // Convert status map to chart data format
        const statusData = Object.keys(statusMap).map(status => ({
          name: status,
          'FIRMADO': statusMap[status]['FIRMADO'],
          'NO FIRMADO': statusMap[status]['NO FIRMADO']
        }));
        
        setStatusChartData(statusData);
        
        // Process Requesting Area / Department data
        const departmentMap: { [key: string]: number } = {};
        
        excelData.forEach((row: any) => {
          const department = row['Requesting Area / Department'];
          
          if (department) {
            departmentMap[department] = (departmentMap[department] || 0) + 1;
          }
        });
        
        // Convert to array and sort in descending order by count
        const departmentData = Object.entries(departmentMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10); // Limit to top 10 departments for better visualization
        
        setRequestingAreaData(departmentData);
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
      {/* Top Row: Total Solicitudes Widget and Estatus Solicitudes */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Total Solicitudes Widget - Combined Card */}
        <Card sx={{ backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
          <CardContent>
            {/* Total Solicitudes Header and Count */}
            <Box sx={{ textAlign: 'center', borderBottom: '2px solid #02355a', paddingBottom: '15px', marginBottom: '15px' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#02355a', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
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
                  marginTop: '10px'
                }}
              >
                {totalCount}
              </Typography>
            </Box>

            {/* Template and No Template Summary */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {/* Template Summary */}
              <Box sx={{ textAlign: 'center', borderRight: '1px solid #e0e0e0' }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#02355a', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px'
                  }}
                >
                  Template
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#02355a',
                    fontSize: '2rem'
                  }}
                >
                  {templateCount}
                </Typography>
              </Box>

              {/* No Template Summary */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#02355a', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px'
                  }}
                >
                  No Template
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#02355a',
                    fontSize: '2rem'
                  }}
                >
                  {noTemplateCount}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Stacked Column Chart */}
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
              Estatus Solicitudes
            </Typography>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={statusChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="FIRMADO" stackId="a" fill="#003d99" />
                <Bar dataKey="NO FIRMADO" stackId="a" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Bottom Row: Pie Chart and Other Widget */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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

        {/* Requesting Area Widget */}
        <Card sx={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '20px' }}>
          <CardContent sx={{ padding: '0' }}>
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
              Requesting Area
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={requestingAreaData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={115} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#003d99" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AribaReport;
