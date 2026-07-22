import { Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Close as CloseIcon } from '@mui/icons-material';
import AssignedLawyerDashboard from '../components/AssignedLawyerDashboard';
import NegotiationStatusChart from '../components/NegotiationStatusChart';
import LawyerListCard from '../components/LawyerListCard';

interface LawyerData {
  lawyer: string;
  count: number;
  percentage: string;
  usdAmount?: number;
}

interface NegotiationStatusData {
  lawyer: string;
  completed: number;
  inNegotiation: number;
  total: number;
  completedPercentage: string;
  inNegotiationPercentage: string;
}

const SLAEventReport = () => {
  const [lawyerData, setLawyerData] = useState<LawyerData[]>([]);
  const [negotiationStatusData, setNegotiationStatusData] = useState<NegotiationStatusData[]>([]);
  const [selectedSignatureStatus, setSelectedSignatureStatus] = useState('All');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    setIsDarkTheme(savedTheme === 'dark');
    
    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme');
      setIsDarkTheme(currentTheme === 'dark');
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching sampleData.xlsx for SLA Event Report...');
        const response = await fetch(`${import.meta.env.BASE_URL}sampleData.xlsx`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);

        // Filter data based on selectedSignatureStatus
        const filteredData = selectedSignatureStatus === 'All' 
          ? excelData 
          : excelData.filter((row: any) => row['Signatures Status'] === selectedSignatureStatus);

        // Process Assigned Lawyer data
        const lawyerMap: { [key: string]: { count: number; usdAmount: number } } = {};

        filteredData.forEach((row: any) => {
          const lawyer = row['Assigned Lawyer'];
          const usdAmount = parseFloat(row['Amount (USD)']) || 0;

          // Ignore blank values
          if (lawyer && lawyer.trim() !== '') {
            if (!lawyerMap[lawyer]) {
              lawyerMap[lawyer] = { count: 0, usdAmount: 0 };
            }
            lawyerMap[lawyer].count++;
            lawyerMap[lawyer].usdAmount += usdAmount;
          }
        });

        // Convert to array and sort in descending order by count
        const total = Object.values(lawyerMap).reduce((sum, data) => sum + data.count, 0);
        const lawyerDataArray = Object.entries(lawyerMap)
          .map(([lawyer, data]) => ({
            lawyer,
            count: data.count,
            percentage: total > 0 ? ((data.count / total) * 100).toFixed(1) : '0.0',
            usdAmount: data.usdAmount,
          }))
          .sort((a, b) => b.count - a.count);

        setLawyerData(lawyerDataArray);

        // Process Negotiation Status data by Assigned Lawyer
        const negotiationMap: {
          [key: string]: { completed: number; inNegotiation: number };
        } = {};

        filteredData.forEach((row: any) => {
          const lawyer = row['Assigned Lawyer'];
          const negotiationStatus = row['Negotiation Status'];

          // Ignore blank lawyer values
          if (lawyer && lawyer.trim() !== '') {
            if (!negotiationMap[lawyer]) {
              negotiationMap[lawyer] = { completed: 0, inNegotiation: 0 };
            }

            if (negotiationStatus === 'COMPLETED') {
              negotiationMap[lawyer].completed++;
            } else if (negotiationStatus === 'IN NEGOTIATION') {
              negotiationMap[lawyer].inNegotiation++;
            }
          }
        });

        // Convert to array and sort by total contracts (descending)
        const negotiationDataArray = Object.entries(negotiationMap)
          .map(([lawyer, counts]) => {
            const total = counts.completed + counts.inNegotiation;
            return {
              lawyer,
              completed: counts.completed,
              inNegotiation: counts.inNegotiation,
              total,
              completedPercentage: total > 0 ? ((counts.completed / total) * 100).toFixed(1) : '0.0',
              inNegotiationPercentage: total > 0 ? ((counts.inNegotiation / total) * 100).toFixed(1) : '0.0',
            };
          })
          .sort((a, b) => b.total - a.total);

        setNegotiationStatusData(negotiationDataArray);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setLawyerData([]);
      }
    };

    fetchData();
  }, [selectedSignatureStatus]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: isDarkTheme ? '#1a1f2e' : '#f4fafd', minHeight: '100vh' }}>
      {/* Signatures Status Filter Section */}
      <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
        {/* Signature Status Filter */}
        <Box>
          <Typography 
            sx={{ 
              fontSize: '12px', 
              fontWeight: '700', 
              color: '#6B7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Box component="span" sx={{ fontSize: '14px' }}>✓</Box>
            SIGNATURES STATUS
          </Typography>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <Select
              id="signature-status-select"
              value={selectedSignatureStatus}
              onChange={(e) => setSelectedSignatureStatus(e.target.value)}
              sx={{
                backgroundColor: isDarkTheme ? '#2d3748' : '#FFFFFF',
                color: isDarkTheme ? '#FFFFFF' : '#1F2937',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '14px',
                fontWeight: '500',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: isDarkTheme ? '#4B5563' : '#D1D5DB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2563EB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2563EB',
                    borderWidth: '2px',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: isDarkTheme ? '#9CA3AF' : '#6B7280',
                },
              }}
            >
              <MenuItem value="All" sx={{ fontSize: '14px' }}>All</MenuItem>
              <MenuItem value="FIRMADO" sx={{ fontSize: '14px' }}>FIRMADO</MenuItem>
              <MenuItem value="NO FIRMADO" sx={{ fontSize: '14px' }}>NO FIRMADO</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Search Button */}
       

        {/* Clear Button */}
        <Button
          variant="outlined"
          startIcon={<CloseIcon sx={{ fontSize: '18px' }} />}
          onClick={() => setSelectedSignatureStatus('All')}
          sx={{
            borderColor: '#D1D5DB',
            color: isDarkTheme ? '#FFFFFF' : '#1F2937',
            backgroundColor: isDarkTheme ? '#2d3748' : '#FFFFFF',
            textTransform: 'uppercase',
            fontSize: '13px',
            fontWeight: '700',
            padding: '8px 20px',
            letterSpacing: '0.05em',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: isDarkTheme ? '#374151' : '#F3F4F6',
              borderColor: '#EF4444',
              color: '#EF4444',
            },
          }}
        >
          Clear
        </Button>
      </Box>

      <AssignedLawyerDashboard data={lawyerData} />
      
      {/* Two-column layout for Negotiation Status and Lawyer List */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '24px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <NegotiationStatusChart data={negotiationStatusData} title="Negotiation Status Breakdown" />
        <LawyerListCard data={lawyerData} title="Lawyer Distribution" />
      </Box>
    </Box>
  );
};

export default SLAEventReport;
