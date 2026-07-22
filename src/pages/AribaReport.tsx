import { Box, Typography, Card, CardContent, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTranslation } from 'react-i18next';
import ApplicationStatusChart from '../components/ApplicationStatusChart';
import SignatureStatusSummary from '../components/SignatureStatusSummary';
import ApplicationsSummary from '../components/ApplicationsSummary';
import ContractStatusWithValueSummary from '../components/ContractStatusWithValueSummary';
import CountryDistribution from '../components/CountryDistribution';
import { Share as ShareIcon, CheckCircle as CheckCircleIcon, Description as DescriptionIcon, Close as CloseIcon } from '@mui/icons-material';

const AribaReport = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [templateCount, setTemplateCount] = useState(0);
  const [noTemplateCount, setNoTemplateCount] = useState(0);
  const [firmadoCount, setFirmadoCount] = useState(0);
  const [noFirmadoCount, setNoFirmadoCount] = useState(0);
  const [borradorCount, setBorradorCount] = useState(0);
  const [publicadoCount, setPublicadoCount] = useState(0);
  const [cerradoCount, setCerradoCount] = useState(0);
  const [canceladoCount, setCanceladoCount] = useState(0);
  const [totalContractValue, setTotalContractValue] = useState(0);
  const [firmadoValue, setFirmadoValue] = useState(0);
  const [noFirmadoValue, setNoFirmadoValue] = useState(0);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number; percentage: string }>>([]);
  const [statusChartData, setStatusChartData] = useState<Array<{ name: string; [key: string]: any }>>([]);
  const [requestingAreaData, setRequestingAreaData] = useState<Array<{ name: string; count: number }>>([]);
  const [countryData, setCountryData] = useState<Array<{ country: string; count: number }>>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allCategories, setAllCategories] = useState<string[]>(['All']);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [allCountries, setAllCountries] = useState<string[]>(['All']);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { t } = useTranslation();
  
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
        console.log('Fetching sampleData.xlsx...');
        const response = await fetch(`${import.meta.env.BASE_URL}sampleData.xlsx`);
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
        
        // Extract all unique categories
        const categoriesSet = new Set<string>();
        const countriesSet = new Set<string>();
        excelData.forEach((row: any) => {
          const category = row['Actual Category'];
          const country = row['Country'];
          if (category) {
            categoriesSet.add(category);
          }
          if (country) {
            countriesSet.add(country);
          }
        });
        const categories = ['All', ...Array.from(categoriesSet).sort()];
        const countries = ['All', ...Array.from(countriesSet).sort()];
        setAllCategories(categories);
        setAllCountries(countries);
        
        // Filter data based on selectedCategory and selectedCountry
        let filteredData = excelData;
        
        if (selectedCategory !== 'All') {
          filteredData = filteredData.filter((row: any) => row['Actual Category'] === selectedCategory);
        }
        
        if (selectedCountry !== 'All') {
          filteredData = filteredData.filter((row: any) => row['Country'] === selectedCountry);
        }
        
        // Count total rows
        const total = filteredData.length;
        console.log('Total records:', total, 'Category:', selectedCategory);
        
        // Count "No Template" and "Template"
        let noTemplate = 0;
        let template = 0;
        let firmado = 0;
        let noFirmado = 0;
        let borrador = 0;
        let publicado = 0;
        let cerrado = 0;
        let cancelado = 0;
        let contractValue = 0;
        let firmadoAmount = 0;
        let noFirmadoAmount = 0;
        
        filteredData.forEach((row: any) => {
          const templateValue = row['Pre-approved Standard Contract Template?'];
          const status = row['Contract Status'];
          const amount = row['Amount (USD)'];
          
          if (templateValue === 'No') {
            noTemplate++;
            noFirmado++;
            // Add amount to noFirmadoAmount
            if (amount && !isNaN(parseFloat(amount))) {
              noFirmadoAmount += parseFloat(amount);
            }
          } else if (templateValue) {
            template++;
            firmado++;
            // Add amount to firmadoAmount
            if (amount && !isNaN(parseFloat(amount))) {
              firmadoAmount += parseFloat(amount);
            }
          }
          
          // Count Contract Status types
          if (status === 'Borrador') {
            borrador++;
          } else if (status === 'Publicado') {
            publicado++;
          } else if (status === 'Cerrado') {
            cerrado++;
          } else if (status === 'Cancelado') {
            cancelado++;
          }
          
          // Sum Amount (USD)
          if (amount && !isNaN(parseFloat(amount))) {
            contractValue += parseFloat(amount);
          }
        });
        
              
        setTotalCount(total);
        setNoTemplateCount(noTemplate);
        setTemplateCount(template);
        setFirmadoCount(firmado);
        setNoFirmadoCount(noFirmado);
        setBorradorCount(borrador);
        setPublicadoCount(publicado);
        setCerradoCount(cerrado);
        setCanceladoCount(cancelado);
        setTotalContractValue(contractValue);
        setFirmadoValue(firmadoAmount);
        setNoFirmadoValue(noFirmadoAmount);
        
        // Calculate percentages for chart
        const templatePercentage = total > 0 ? ((template / total) * 100).toFixed(2) : '0.00';
        const noTemplatePercentage = total > 0 ? ((noTemplate / total) * 100).toFixed(2) : '0.00';
        
        const chartData = [
          { name: t('noTemplate'), value: noTemplate, percentage: noTemplatePercentage },
          { name: t('template'), value: template, percentage: templatePercentage }
        ];
        
        setChartData(chartData);
        
        // Process Contract Status data for stacked bar chart
        const statusMap: { [key: string]: { [key: string]: number } } = {};
        
        filteredData.forEach((row: any) => {
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
        
        filteredData.forEach((row: any) => {
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

        // Process Country data with Region
        const countryMap: { [key: string]: { count: number; region: string } } = {};
        
        filteredData.forEach((row: any) => {
          const country = row['Country'];
          const region = row['Region'] || 'N/A';
          
          if (country) {
            if (!countryMap[country]) {
              countryMap[country] = { count: 0, region };
            }
            countryMap[country].count++;
          }
        });
        
        // Convert to array and sort in descending order by count
        const cData = Object.entries(countryMap)
          .map(([country, data]) => ({ country, count: data.count, region: data.region }))
          .sort((a, b) => b.count - a.count);
        
        setCountryData(cData);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        setTotalCount(0);
        setTemplateCount(0);
        setNoTemplateCount(0);
      }
    };

    fetchData();
  }, [selectedCategory, selectedCountry]);

  return (
    <Box sx={{ padding: '20px', backgroundColor: isDarkTheme ? '#1a1f2e' : '#f4fafd', minHeight: '100vh' }}>
      {/* Filter Section - Enhanced */}
      <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Category Filter */}
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
            <Box component="span" sx={{ fontSize: '14px' }}>🏷️</Box>
            {t('actualCategory') || 'CATEGORÍA ACTUAL'}
          </Typography>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <Select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              {allCategories.map((category) => (
                <MenuItem key={category} value={category} sx={{ fontSize: '14px' }}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Country Filter */}
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
            <Box component="span" sx={{ fontSize: '14px' }}>🌍</Box>
            {t('selectCountry') || 'SELECCIONAR PAÍS'}
          </Typography>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <Select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
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
              {allCountries.map((country) => (
                <MenuItem key={country} value={country} sx={{ fontSize: '14px' }}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

      {/* Clear Button */}
        <Button
          variant="outlined"
          startIcon={<CloseIcon sx={{ fontSize: '18px' }} />}
          onClick={() => {
            setSelectedCategory('All');
            setSelectedCountry('All');
          }}
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
          {t('clear') || 'LIMPIAR'}
        </Button>
      </Box>

      {/* KPI Cards Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <ApplicationsSummary
          title={t('totalApplications')}
          totalCount={totalCount}
          templateCount={templateCount}
          noTemplateCount={noTemplateCount}
          icon={<ShareIcon sx={{ fontSize: '2rem' }} />}
        />
        <SignatureStatusSummary
          title={t('signaturesStatus')}
          firmadoCount={firmadoCount}
          noFirmadoCount={noFirmadoCount}
          firmadoValue={firmadoValue}
          noFirmadoValue={noFirmadoValue}
          icon={<CheckCircleIcon sx={{ fontSize: '2rem' }} />}
        />
        <ContractStatusWithValueSummary
          title={t('contractStatus')}
          totalValue={totalContractValue}
          borradorCount={borradorCount}
          publicadoCount={publicadoCount}
          cerradoCount={cerradoCount}
          canceladoCount={canceladoCount}
          icon={<DescriptionIcon sx={{ fontSize: '2rem',color:'#F59E0B'}} />}
        />
      </Box>

      {/* Application Status Chart and Country Distribution Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '20px', marginBottom: '30px' }}>
        <ApplicationStatusChart data={statusChartData} title={t('applicationStatus')} />
        <CountryDistribution data={countryData} title={t('countryDistribution')} />
      </Box>

      {/* Bottom Row: Pie Chart and Requesting Area */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '20px', marginTop: '30px' }}>
        {/* Pie Chart Card */}
        <Card
          sx={{
            backgroundColor:'#FFFFFF',
            border: "1px solid #E5E7EB",
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(15,23,42,.08)',
            padding: '20px',
          }}
        >
          <CardContent sx={{ padding: '20px' }}>
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
                textAlign: 'center',
              }}
            >
              {t('contractType')}
            </Typography>

            <ResponsiveContainer width="100%" height={250}>
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
                <Tooltip formatter={(value: any) => `${value}`} labelFormatter={() => ''} />
                <Legend verticalAlign="bottom" height={36} formatter={(value) => value.toUpperCase()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Requesting Area Widget */}
        <Card
          sx={{
            backgroundColor: '#FFFFFF',
            border: "1px solid #E5E7EB",
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(15,23,42,.08)',
            padding: '20px',
          }}
        >
          <CardContent sx={{ padding: '20px' }}>
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
                textAlign: 'center',
              }}
            >
              {t('requestingArea')}
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={requestingAreaData} layout="vertical" margin={{ top: 5, right: 10, left: 120, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? '#4B5563' : '#e0e0e0'} />
                <XAxis type="number" stroke={isDarkTheme ? '#9CA3AF' : '#666'} tick={{ fill: isDarkTheme ? '#9CA3AF' : '#666', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={115} tick={{ fontSize: 12, fill: isDarkTheme ? '#9CA3AF' : '#666' }} stroke={isDarkTheme ? '#9CA3AF' : '#666'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkTheme ? '#2d3748' : '#fff',
                    border: isDarkTheme ? '1px solid #4B5563' : '1px solid #ccc',
                    borderRadius: '4px',
                    color: isDarkTheme ? '#FFFFFF' : '#000000',
                  }}
                />
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
