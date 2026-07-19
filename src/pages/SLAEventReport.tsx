import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching sampleData.xlsx for SLA Event Report...');
        const response = await fetch('/sampleData.xlsx');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);

        // Process Assigned Lawyer data
        const lawyerMap: { [key: string]: { count: number; usdAmount: number } } = {};

        excelData.forEach((row: any) => {
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

        excelData.forEach((row: any) => {
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
  }, []);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <AssignedLawyerDashboard data={lawyerData} title="Assigned Lawyer" />
      
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
