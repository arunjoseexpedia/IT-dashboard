import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ScatterData {
  amount: number;
  e2eDuration: number;
  contractNumber: string;
  contractType: string;
}

interface AmountVsE2EDurationChartProps {
  data: ScatterData[];
  title?: string;
}

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

const COLORS = [
  '#2563EB',
  '#06B6D4',
  '#22C55E',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#EF4444',
  '#6B7280',
];

const AmountVsE2EDurationChart = ({
  data,
  title = 'Amount vs E2E Duration',
}: AmountVsE2EDurationChartProps) => {
  // Custom tooltip
  const CustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '12px',
            boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              marginBottom: '2px',
            }}
          >
            Contract: {dataPoint.contractNumber}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#6B7280',
              marginBottom: '4px',
            }}
          >
            Type: {dataPoint.contractType}
          </Typography>
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '2px',
            }}
          >
            Amount: ${dataPoint.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
            Duration: {dataPoint.e2eDuration.toLocaleString('en-US', { maximumFractionDigits: 1 })} days
          </Typography>
        </Box>
      );
    }
    return null;
  };

  // Calculate statistics
  const avgAmount = data.length > 0 ? data.reduce((sum, item) => sum + item.amount, 0) / data.length : 0;
  const avgDuration = data.length > 0 ? data.reduce((sum, item) => sum + item.e2eDuration, 0) / data.length : 0;
  const maxAmount = data.length > 0 ? Math.max(...data.map((item) => item.amount)) : 0;
 console.log(avgAmount, avgDuration, maxAmount);
  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
        padding: '0',
        marginBottom: '24px',
      }}
    >
      <CardContent
        sx={{
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {title}
        </Typography>

        {/* Chart Container */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="e2eDuration"
                  name="E2E Duration (Days)"
                  type="number"
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: 'E2E Duration (Days)',
                    position: 'insideBottomLeft',
                    offset: -50,
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#6B7280',
                  }}
                />
                <YAxis
                  dataKey="amount"
                  name="Amount (USD)"
                  type="number"
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${formatAmount(value)}`}
                  label={{
                    value: 'Amount (USD)',
                    angle: -90,
                    dx: -15,
                    position: 'insideLeft',
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#6B7280',
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                  name="Contracts"
                  data={data}
                  fill="#2563EB"
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={0.7}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 350,
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#6B7280',
                  fontWeight: 500,
                }}
              >
                No amount vs duration data available
              </Typography>
            </Box>
          )}
        </Box>

        {/* Summary Statistics */}
       
      </CardContent>
    </Card>
  );
};

export default AmountVsE2EDurationChart;
