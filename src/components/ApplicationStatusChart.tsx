import { Card, CardContent, Typography, Box} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import * as XLSX from 'xlsx';
import './../App.css'

interface ApplicationStatusChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  title: string;
  height?: number;
  onBarClick?: (data: any, barName: string) => void;
  onPieChartDataReady?: (chartData: any) => void;
}

interface SignatureStatusData {
  name: string;
  value: number;
}

// Green for FIRMADO, Red for NO FIRMADO

// Reusable formatter function for amounts in millions


const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = ({ data, title, onBarClick, onPieChartDataReady }) => {
  console.log('ApplicationStatusChart data:', data);
 

  // Fetch and process data when a bar is clicked
  const handleBarClick = async (data: any, barName: string) => {
    console.log('X-axis name:', data.name); // e.g., "Borrador"
    console.log('Bar name:', barName); // e.g., "FIRMADO"
    
    // Call parent component handler if provided
    if (onBarClick) {
      onBarClick(data, barName);
    }
    
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
      
      // Filter by contract status (X-axis name)
      const filteredData = excelData.filter((row: any) => {
        const contractStatus = row['Contract Status'];
        return contractStatus === data.name;
      });

      // Group by Signatures Status and sum Amount (USD)
      const firmadoSum = filteredData
        .filter((row: any) => row['Signatures Status'] === 'FIRMADO')
        .reduce((sum: number, row: any) => sum + (parseFloat(row['Amount (USD)']) || 0), 0);

      const noFirmadoSum = filteredData
        .filter((row: any) => row['Signatures Status'] === 'NO FIRMADO')
        .reduce((sum: number, row: any) => sum + (parseFloat(row['Amount (USD)']) || 0), 0);

      // Round to 2 decimal places
      const firmadoRounded = Math.round(firmadoSum * 100) / 100;
      const noFirmadoRounded = Math.round(noFirmadoSum * 100) / 100;
      const totalRounded = Math.round((firmadoSum + noFirmadoSum) * 100) / 100;

      // Create pie chart data
      const pieData: SignatureStatusData[] = [];
      if (firmadoRounded > 0) {
        pieData.push({ name: 'FIRMADO', value: firmadoRounded });
      }
      if (noFirmadoRounded > 0) {
        pieData.push({ name: 'NO FIRMADO', value: noFirmadoRounded });
      }

     
      if (onPieChartDataReady) {
        onPieChartDataReady({
          signatureStatusData: pieData,
          contractStatusTotal: totalRounded,
          firmadoAmount: firmadoRounded,
          noFirmadoAmount: noFirmadoRounded,
        });
      }
    } catch (error) {
      console.error('Error reading Excel file:', error);
     
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(15,23,42,.08)',
        height: '100%',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          padding: '10px 16px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#02355a',
            textTransform: 'uppercase',
            marginBottom: '6px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '4px',
            textAlign: 'center',
            flexShrink: 0,
            fontSize: '11px',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
         
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                tabIndex={0}
                barSize={11}
                data={data}
                margin={{ top: 2, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#02355a" tick={{ fontSize: 10 }} />
                <YAxis stroke="#666" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    fontSize: '10px',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '2px', fontSize: '10px' }} />
                <Bar 
                  dataKey="FIRMADO" 
                  stackId="a" 
                  fill="#003d99" 
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => handleBarClick(data, 'FIRMADO')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar 
                  dataKey="NO FIRMADO" 
                  stackId="a" 
                  fill="#1976d2" 
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => handleBarClick(data, 'NO FIRMADO')}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          
      </Box>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusChart;
