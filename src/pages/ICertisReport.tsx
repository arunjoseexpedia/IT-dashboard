import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import TopProjectsByE2EProcess from '../components/TopProjectsByE2EProcess';
import ContractsByWorkArea from '../components/ContractsByWorkArea';
import E2EProcessingTimeChart from '../components/E2EProcessingTimeChart';
import AmountVsE2EDurationChart from '../components/AmountVsE2EDurationChart';

const ICertisReport = () => {
  const { t } = useTranslation();
  const [projectData, setProjectData] = useState<any[]>([]);
  const [contractData, setContractData] = useState<any[]>([]);
  const [e2eProcessingData, setE2eProcessingData] = useState<any[]>([]);
  const [amountVsE2eData, setAmountVsE2eData] = useState<any[]>([]);
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
        console.log('Fetching sampleData.xlsx for ICERTIS Report...');
        const response = await fetch(`${import.meta.env.BASE_URL}sampleData.xlsx`);
        console.log('Response status:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet);

        // Process Top Projects by E2E Process
        const projectMap: { [key: string]: { contractNumber: string; projectName: string; workAreaId: string; e2eProcess: number } } = {};

        excelData.forEach((row: any) => {
          const projectName = row['Project – Project Name'];
          const contractNumber = row['Contract Number'];
          const workAreaId = row['Work Area ID'];
          const e2eProcess = parseFloat(row['Total E2E Process (New Template)']) || 0;

          // Ignore blank project names
          if (projectName && projectName.trim() !== '') {
            if (!projectMap[projectName]) {
              projectMap[projectName] = { contractNumber: contractNumber || '', projectName: projectName, workAreaId: workAreaId || '', e2eProcess: 0 };
            }
            projectMap[projectName].e2eProcess += e2eProcess;
          }
        });

        // Convert to array, sort by E2E Process descending, and take top 10
        const projectDataArray = Object.entries(projectMap)
          .map(([_, data]) => ({
            contractNumber: data.contractNumber,
            projectName: data.projectName,
            workAreaId: data.workAreaId,
            e2eProcess: Math.round(data.e2eProcess * 100) / 100, // Round to 2 decimal places
          }))
          .sort((a, b) => b.e2eProcess - a.e2eProcess)
          .slice(0, 20); // Top 10 projects
        console.log('Top Projects by E2E Process:', projectDataArray);
        setProjectData(projectDataArray);

        // Process Contracts by Work Area
        const contractMap: { [key: string]: { contractType: string; count: number } } = {};

        excelData.forEach((row: any) => {
          const workAreaId = row['Work Area ID'];
          const contractType = row['Contract Type'];

          // Ignore blank work area IDs
          if (workAreaId && workAreaId.trim() !== '') {
            if (!contractMap[workAreaId]) {
              contractMap[workAreaId] = { contractType: contractType || '', count: 0 };
            }
            contractMap[workAreaId].count++;
          }
        });

        // Convert to array and sort by count descending
        const contractDataArray = Object.entries(contractMap)
          .map(([workAreaId, data]) => ({
            workAreaId,
            contractType: data.contractType,
            contractCount: data.count,
          }))
          .sort((a, b) => b.contractCount - a.contractCount);

        console.log('Contracts by Work Area:', contractDataArray);
        setContractData(contractDataArray);

        // Process E2E Processing Time by Contract Type
        const e2eProcessingMap: { [key: string]: { total: number; count: number } } = {};

        excelData.forEach((row: any) => {
          const contractType = row['Contract Type'];
          const e2eProcessingTime = parseFloat(row['Total E2E Process (New Template)']) || 0;

          // Ignore blank contract types
          if (contractType && contractType.trim() !== '') {
            if (!e2eProcessingMap[contractType]) {
              e2eProcessingMap[contractType] = { total: 0, count: 0 };
            }
            e2eProcessingMap[contractType].total += e2eProcessingTime;
            e2eProcessingMap[contractType].count++;
          }
        });
        
        // Convert to array with average processing time
        const e2eProcessingDataArray = Object.entries(e2eProcessingMap)
          .map(([contractType, data]) => ({
            contractType,
            avgProcessingTime: Math.round((data.total / data.count) * 100) / 100,
            recordCount: data.count,
          }))
          .sort((a, b) => b.avgProcessingTime - a.avgProcessingTime);

        console.log('E2E Processing Time by Contract Type:', e2eProcessingDataArray);
        setE2eProcessingData(e2eProcessingDataArray);

        // Process Amount vs E2E Duration for Scatter Plot
        const scatterData = excelData
          .filter((row: any) => {
            const amount = parseFloat(row['Amount (USD)']);
            const e2eDuration = parseFloat(row['Total E2E Process (New Template)']);
            return !isNaN(amount) && !isNaN(e2eDuration) && amount > 0 && e2eDuration > 0;
          })
          .slice(0, 100) // Limit to 100 points for clarity
          .map((row: any) => ({
            amount: parseFloat(row['Amount (USD)']) || 0,
            e2eDuration: parseFloat(row['Total E2E Process (New Template)']) || 0,
            contractNumber: row['Contract Number'] || 'N/A',
            contractType: row['Contract Type'] || 'N/A',
          }));

        console.log('Amount vs E2E Duration:', scatterData);
        setAmountVsE2eData(scatterData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setProjectData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: '20px', backgroundColor: isDarkTheme ? '#1a1f2e' : '#f4fafd', minHeight: '100vh' }}>
      {/* Top Row - Two-column layout for charts */}
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
        <TopProjectsByE2EProcess data={projectData} title={t('topProjectsByE2E')} />
        <ContractsByWorkArea data={contractData} title={t('contractsByWorkArea')} />
      </Box>

      {/* Bottom Row - Two-column layout for additional charts */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: '24px',
          marginTop: '24px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <E2EProcessingTimeChart data={e2eProcessingData} title={t('e2eProcessingTime')} />
        <AmountVsE2EDurationChart data={amountVsE2eData} title={t('amountVsE2eDuration')} />
      </Box>
    </Box>
  );
};

export default ICertisReport;
