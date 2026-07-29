import { Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import North from '@mui/icons-material/North';

interface TrendData {
  releasePeriod: string;
  amount: number;
}

interface ContractStatusWithValueSummaryProps {
  title: string;
  totalValue: number;
  borradorCount: number;
  publicadoCount: number;
  cerradoCount: number;
  canceladoCount?: number;
  icon?: React.ReactNode;
}

const ContractStatusWithValueSummary: React.FC<ContractStatusWithValueSummaryProps> = ({
  title,
  totalValue,
  borradorCount,
  publicadoCount,
  cerradoCount,
  canceladoCount = 0
 
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [highestPeriod, setHighestPeriod] = useState('');
  const [averageAmount, setAverageAmount] = useState(0);
  const [hasData, setHasData] = useState(true);

  const formattedValue = (totalValue / 1000000).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}) + 'M';

  // Fetch and process trend data
  const fetchTrendData = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}sampleData.xlsx`);
      if (!response.ok) throw new Error('Failed to fetch Excel file');

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(sheet);

      // Group by Request Creation Period and sum Amount (USD)
      const periodMap: Record<string, number> = {};
      (excelData as any[]).forEach((row: any) => {
        const period = row['Request Creation Period'];
        const amount = row['Amount (USD)'];

        if (period && amount && !isNaN(parseFloat(amount))) {
          periodMap[period] = (periodMap[period] || 0) + parseFloat(amount);
        }
      });

      if (Object.keys(periodMap).length === 0) {
        setHasData(false);
        setTrendData([]);
        return;
      }

      // Sort periods chronologically
      const sortedPeriods = Object.keys(periodMap).sort((a, b) => {
        // Parse period like "Apr 25" to sortable format
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const yearDiff = parseInt(yearA || '0') - parseInt(yearB || '0');
        if (yearDiff !== 0) return yearDiff;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.indexOf(monthA) - months.indexOf(monthB);
      });

      // Get last 12 months
      const last12Months = sortedPeriods.slice(-12);

      // Create data array for last 12 months (including zero-count months if needed)
      const data: TrendData[] = last12Months.map(period => ({
        releasePeriod: period,
        amount: periodMap[period],
      }));

      setHasData(true);
      setTrendData(data);

      // Calculate statistics for last 12 months
      const total = data.reduce((sum, item) => sum + item.amount, 0);
      const highest = data.reduce((max, item) => (item.amount > max.amount ? item : max));
      const average = total / data.length;

      setTotalAmount(total);
      setHighestPeriod(highest.releasePeriod);
      setAverageAmount(average);
    } catch (error) {
      console.error('Error fetching trend data:', error);
      setHasData(false);
    }
  };

  // Load data when dialog opens
  useEffect(() => {
    if (dialogOpen && trendData.length === 0) {
      fetchTrendData();
    }
  }, [dialogOpen]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      <Card
        onClick={() => setDialogOpen(true)}
        sx={{
          background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 50%, #ef89beff 100%)',  
          border: "1px solid #f5e3b4ff",
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'visible',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
          },
           height: '90%',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
        }}
    >
      <CardContent
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Header */}<Box
  sx={{
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  <Typography
    variant="subtitle2"
    sx={{
      fontWeight: 600,
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '12px',
    }}
  >
    {title}
  </Typography>

  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      color: '#13e664ff',
      fontSize: '16px',
      fontWeight: 600,
    }}
  >
    <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
      47%
    </Typography>
    <North sx={{ fontSize: '18px', ml: 0.5 }} />
  </Box>
</Box>
      

        {/* Icon Badge - Top Right */}
        

        {/* Total Value Section */}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              fontSize: '11px',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Total Contract Value
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              color: 'white',
              fontSize: '32px',
              lineHeight: 1,
              wordBreak: 'break-word',
            }}
          >
            {formattedValue}
          </Typography>
        </Box>

        {/* Contract Status Grid - 4 columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginTop: 'auto' }}>
          {/* Borrador */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Borrador
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {borradorCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Publicado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Publicado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {publicadoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cerrado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Cerrado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {cerradoCount.toLocaleString()}
            </Typography>
          </Box>

          {/* Cancelado */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                fontSize: '10px',
              }}
            >
              Cancelado
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '18px',
                marginTop: '6px',
                lineHeight: 1,
              }}
            >
              {canceladoCount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>

    {/* Dialog */}
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#02355a',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          paddingBottom: '12px',
          borderBottom: '2px solid white',
        }}
      >
        Amount (USD) by Request Creation Period for Last 7 Months
      </DialogTitle>

      <DialogContent
        sx={{
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {hasData && trendData.length > 0 ? (
          <>
            {/* Summary Cards Row */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
              }}
            >
              {/* Total Amount Card */}
              <Box
                sx={{
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: '#0C4A6E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '11px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Total Amount
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#0284C7',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  {formatCurrency(totalAmount)}
                </Typography>
              </Box>

              {/* Highest Release Period Card */}
              <Box
                sx={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBFBAB',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: '#14532D',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '11px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Peak Period
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#16A34A',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  {highestPeriod}
                </Typography>
              </Box>

              {/* Average Amount Card */}
              <Box
                sx={{
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #FCD34D',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: '#78350F',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '11px',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Average per Period
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#CA8A04',
                    fontSize: '20px',
                    lineHeight: 1,
                  }}
                >
                  {formatCurrency(averageAmount)}
                </Typography>
              </Box>
            </Box>

            {/* Chart */}
            <Box sx={{ width: '100%', height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="releasePeriod"
                    stroke="#6B7280"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                    formatter={(value: any) => [formatCurrency(value), 'Amount']}
                    labelFormatter={(label: any) => `Period: ${label}`}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '16px' }}
                    formatter={() => 'Total Amount (USD)'}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ fill: '#2563EB', r: 5 }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#6B7280',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              No Data Available
            </Typography>
            <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
              Request Creation Period data is not yet available.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          padding: '16px',
          borderTop: '1px solid #E5E7EB',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={() => setDialogOpen(false)}
          variant="contained"
          sx={{
            backgroundColor: '#EC4899',
            color: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
            padding: '10px 32px',
            fontSize: '14px',
            '&:hover': {
              backgroundColor: '#DB2777',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ContractStatusWithValueSummary;
