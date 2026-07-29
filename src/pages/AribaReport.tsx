import { Box, Typography, Card, CardContent, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTranslation } from 'react-i18next';
import ApplicationStatusChart from '../components/ApplicationStatusChart';
import SignatureStatusSummary from '../components/SignatureStatusSummary';
import ApplicationsSummary from '../components/ApplicationsSummary';
import ContractStatusWithValueSummary from '../components/ContractStatusWithValueSummary';
import CountryDistribution from '../components/CountryDistribution';
import { Work, Description, Folder, Close as CloseIcon } from '@mui/icons-material';

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
  const [showApplicationStatusDetails, setShowApplicationStatusDetails] = useState(false);
  const [selectedContractStatus, setSelectedContractStatus] = useState<string | null>('Borrador');
  const [pieChartData, setPieChartData] = useState<any>({
    "signatureStatusData": [
        {
            "name": "FIRMADO",
            "value": 4640520.58
        },
        {
            "name": "NO FIRMADO",
            "value": 199472.87
        }
    ],
    "contractStatusTotal": 4839993.45,
    "firmadoAmount": 4640520.58,
    "noFirmadoAmount": 199472.87
});
  const { t } = useTranslation();
  const SIGNATURE_COLORS = ['#22C55E', '#EF4444'];
  console.log('Chart Data:', chartData);
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
        console.log('Chart Data:', chartData);
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

  // Handle Application Status bar click
  const handleApplicationStatusBarClick = (data: any, barName: string) => {
    setSelectedContractStatus(data.name);
    console.log('Application Status Bar Clicked:', data.name, barName);
    console.log('Show Application Status Details:', showApplicationStatusDetails);
    setShowApplicationStatusDetails(true);
  };
const formatAmount = (value:any) => {
  const num = Number(value);

  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }

  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }

  return `$${num.toFixed(2)}`;
};
  // Handle close Application Status details
 {/* const handleCloseApplicationStatusDetails = () => {
    setShowApplicationStatusDetails(false);
    setPieChartData('');
  }; */}
 const renderCustomLabel = (props: any) => {
    const { x, y, name, value, index } = props;
    const cx = props.cx || 0;
    const cy = props.cy || 0;
   console.log(cy);
    // Determine if label is on left or right side
    const isRight = x > cx;
    
    // Add spacing from the pie edge
    const labelOffset = 10;
    const labelX = isRight ? x + labelOffset : x - labelOffset;
    
    // Get color based on index
    const labelColor = SIGNATURE_COLORS[index % SIGNATURE_COLORS.length];
 
    return (
      <text
        x={labelX}
        y={y}
        fill={labelColor}
        fontSize="11"
        fontWeight="500"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${name}: ${formatAmount(value)}`}
      </text>
    );
  };
const getContractStatusPercentage = (status: string): number => {
  switch (status) {
    case 'Vencido':
      return 10;
    case 'Borrador':
      return 70;
    case 'Publicado':
      return 30;
    case 'Cerrado':
      return 32;
    case 'Cancelado':
      return 0;
    default:
      return 0;
  }
};
// Handle show pie chart from ApplicationStatusChart
const handleShowPieChartData = (chartData: any) => {
  console.log('Received pie chart data from ApplicationStatusChart:', chartData);
  setPieChartData(chartData);
};

  return (
    <Box sx={{ padding: '16px', backgroundColor: isDarkTheme ? '#1a1f2e' : '#f4fafd', minHeight: '80vh' }}>
      <Box sx={{ marginBottom: '14px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
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
            textTransform: 'none',
            fontSize: '13px',
            fontWeight: '700',
            padding: '8px 20px',
            letterSpacing: '0.05em',
            borderRadius: '20px',
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
       
          

      <Box
        sx={{
          display: 'grid',
          
    gridTemplateColumns: {
      xs: '1fr',
      sm: '1fr 1fr',
      md: '1fr 1fr 1fr',
    },
    gap: '12px',          // Reduced from 16px
    marginBottom: '0px', // Reduced from 16px
    alignItems: 'stretch',
        }}
      >
        <ApplicationsSummary
          title={t('totalApplications')}
          totalCount={totalCount}
          templateCount={templateCount}
          noTemplateCount={noTemplateCount}
          icon={<Work sx={{ fontSize: '2rem' }} />}
        />
        <SignatureStatusSummary
          title={t('signaturesStatus')}
          firmadoCount={firmadoCount}
          noFirmadoCount={noFirmadoCount}
          firmadoValue={firmadoValue}
          noFirmadoValue={noFirmadoValue}
          icon={<Description sx={{ fontSize: '2rem' }} />}
        />
        <ContractStatusWithValueSummary
          title={t('contractStatus')}
          totalValue={totalContractValue}
          borradorCount={borradorCount}
          publicadoCount={publicadoCount}
          cerradoCount={cerradoCount}
          canceladoCount={canceladoCount}
          icon={<Folder  sx={{ fontSize: '2rem'}} />}
        />
      </Box>

      {/* Application Status Chart and Country Distribution Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '10px', marginBottom: '0px' }}>
        <ApplicationStatusChart 
          data={statusChartData} 
          title={t('applicationStatus')} 
          onBarClick={handleApplicationStatusBarClick}
          onPieChartDataReady={handleShowPieChartData}
        />
        
        
          <Card
            sx={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(15,23,42,.08)',
              height: '70%',
        minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
            }}
          > <Typography
    sx={{
      position: 'absolute',
      top: 35,
      right: 16,
      fontSize: '12px',
      fontWeight: 500,
      color: '#5e5e5e',
      px: 1,
      py: 0.3,
      borderRadius: '4px',
      
    }}
  >
   Contract Status: {selectedContractStatus} ( {getContractStatusPercentage(selectedContractStatus || '')}% )
  </Typography>
            <CardContent
              sx={{
                padding: '10px 16px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              {/* Header with Close Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#02355a',
                    textTransform: 'uppercase',
                    marginBottom: '0px',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #02355a',
                    paddingBottom: '4px',
                    textAlign: 'center',
                    fontSize: '11px',
                    flex: 1,
                  }}
                >
                  {t('applicationStatus')} Detail
                </Typography>
                
              </Box>

              {/* Pie Chart Content */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {/* Subtitle */}
               
                {/* Summary Cards */}
             
                  {/* Total Amount Card */}
                  


                {/* Pie Chart */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 150 }}>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={pieChartData?.signatureStatusData}
                        cx="50%"
                        cy="42%"
                        labelLine={true}
                        label={renderCustomLabel}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                      >
                       {pieChartData?.signatureStatusData.map((_:any, index:any) => (
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
                </Box>
               
              </Box>
            </CardContent>
          </Card>
        
      </Box>

      {/* Bottom Row: Pie Chart and Requesting Area */}
      <Box sx={{ display: 'grid', height: 420, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '10px', marginTop: '0px' }}>
        <CountryDistribution data={countryData} title={t('countryDistribution')} />
        
        {/* Pie Chart Card */}
        {/* <Card
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
            marginBottom: '6px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '4px',
            textAlign: 'center',
            flexShrink: 0,
            fontSize: '11px',
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
                <Legend verticalAlign="bottom" height={14}  formatter={(value) => (
    <span
      style={{
        fontSize: '12px',      // Reduce font size
        fontWeight: 500,
        color: '#003d99',
        textTransform: 'uppercase',
      }}
    >
      {value}
    </span>
  )} />
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
            marginBottom: '6px',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #02355a',
            paddingBottom: '4px',
            textAlign: 'center',
            flexShrink: 0,
            fontSize: '11px',
          }}
        >
              {t('requestingArea')}
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={requestingAreaData} layout="vertical" margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
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
