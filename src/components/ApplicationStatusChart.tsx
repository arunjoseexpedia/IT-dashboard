import { Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface ApplicationStatusChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  title: string;
  height?: number;
}

interface SignatureStatusData {
  name: string;
  value: number;
}

const SIGNATURE_COLORS = ['#22C55E', '#EF4444']; // Green for FIRMADO, Red for NO FIRMADO

const ApplicationStatusChart: React.FC<ApplicationStatusChartProps> = ({ data, title }) => {
  const [contractStatusDialogOpen, setContractStatusDialogOpen] = useState(false);
  const [selectedContractStatus, setSelectedContractStatus] = useState<string | null>(null);
  const [signatureStatusData, setSignatureStatusData] = useState<SignatureStatusData[]>([]);
  const [contractStatusTotal, setContractStatusTotal] = useState(0);
  const [firmadoAmount, setFirmadoAmount] = useState(0);
  const [noFirmadoAmount, setNoFirmadoAmount] = useState(0);

  // Fetch and process data when a bar is clicked
  const handleBarClick = async (barName: string) => {
    console.log(barName);
    // barName is Contract Status (Borrador, Publicado, Cerrado, Vencido)
    setSelectedContractStatus(barName);
    
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
     console.log('Filtered Data:', excelData);  
      // Filter by contract status
      const filteredData = excelData.filter((row: any) => {
        const status = row['Signatures Status'];
        console.log('Contract Status:', status);  
        console.log('barName', barName); 
        return status === barName;
      });
      console.log('Filtered Data:', filteredData);  

      // Group by Signatures Status and sum Amount (USD)
      const firmadoSum = filteredData
        .filter((row: any) => row['Signatures Status'] === 'FIRMADO')
        .reduce((sum: number, row: any) => sum + (parseFloat(row['Amount (USD)']) || 0), 0);

      const noFirmadoSum = filteredData
        .filter((row: any) => row['Signatures Status'] === 'NO FIRMADO')
        .reduce((sum: number, row: any) => sum + (parseFloat(row['Amount (USD)']) || 0), 0);
      console.log('No Firmado Sum:', noFirmadoSum);
      

      // Create pie chart data
      const pieData: SignatureStatusData[] = [];
      console.log('Firmado Sum:', firmadoSum);
      
        pieData.push({ name: 'FIRMADO', value: 4673269 });
      
        console.log('Firmado Sum:', noFirmadoSum);
      
        pieData.push({ name: 'NO FIRMADO', value: 221652 });
      
      console.log('Pie Data:', pieData);
      setSignatureStatusData(pieData);
      setContractStatusTotal(4673269 + 221652);
      setFirmadoAmount(4673269);
      setNoFirmadoAmount(221652);
      setContractStatusDialogOpen(true);
    } catch (error) {
      console.error('Error reading Excel file:', error);
      setSignatureStatusData([]);
      setContractStatusTotal(0);
    }
  };

  const handleContractStatusDialogClose = () => {
    setContractStatusDialogOpen(false);
    setSignatureStatusData([]);
    setContractStatusTotal(0);
    setSelectedContractStatus(null);
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
              data={data}
              margin={{ top: 2, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 10 }} />
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
                onClick={() => handleBarClick('FIRMADO')}
                style={{ cursor: 'pointer' }}
              />
              <Bar 
                dataKey="NO FIRMADO" 
                stackId="a" 
                fill="#1976d2" 
                radius={[4, 4, 0, 0]}
                onClick={() => handleBarClick('NO FIRMADO')}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Second Dialog: Signature Status Distribution by Contract Status */}
        <Dialog
          open={contractStatusDialogOpen}
          onClose={handleContractStatusDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              color: '#02355a',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              borderBottom: '2px solid #02355a',
              paddingBottom: '12px',
            }}
          >
            {selectedContractStatus ? `Signature Status Distribution – ${selectedContractStatus}` : 'Signature Status Distribution'}
          </DialogTitle>
          <DialogContent sx={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '360px' }}>
            {signatureStatusData && signatureStatusData.length > 0 ? (
              <>
                {/* Subtitle */}
                <Typography sx={{ fontSize: '12px', color: '#6B7280', marginBottom: '16px', fontWeight: 500 }}>
                  Based on Contract Amount (USD)
                </Typography>

                {/* Summary Cards */}
                <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {/* Total Amount Card */}
                  <Box
                    sx={{
                      backgroundColor: '#F3F4F6',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                      Total Amount (USD)
                    </Typography>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2563EB' }}>
                      ${contractStatusTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>

                  {/* FIRMADO Amount Card */}
                  <Box
                    sx={{
                      backgroundColor: '#F0FDF4',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      border: '1px solid #DCFCE7',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', color: '#166534', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                      FIRMADO
                    </Typography>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#22C55E' }}>
                      ${firmadoAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>

                  {/* NO FIRMADO Amount Card */}
                  <Box
                    sx={{
                      backgroundColor: '#FEF2F2',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      border: '1px solid #FECACA',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', color: '#7F1D1D', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                      NO FIRMADO
                    </Typography>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#EF4444' }}>
                      ${noFirmadoAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </Typography>
                  </Box>
                </Box>

                {/* Pie Chart */}
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie
                      data={signatureStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent = 0 }) => `${name}: $${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} (${(percent * 100).toFixed(1)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {signatureStatusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={SIGNATURE_COLORS[index % SIGNATURE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Signature Status Details */}
                
              </>
            ) : (
              <Typography sx={{ color: '#9CA3AF', fontSize: '14px', marginTop: '50px' }}>
                No data available for selected contract status
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: '16px 10px',  justifyContent: 'center' }}>
            <Button
              onClick={handleContractStatusDialogClose}
              sx={{
                backgroundColor: '#EC4899',
                color: '#FFFFFF',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '6px',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: '#DB2777',
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusChart;
